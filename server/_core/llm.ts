import Anthropic from "@anthropic-ai/sdk";
import { ENV } from "./env";
import sharp from "sharp";
import heicConvert from "heic-convert";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4";
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

const assertApiKey = () => {
  if (!ENV.anthropicApiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
};

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  assertApiKey();

  const { messages, maxTokens, max_tokens } = params;

  // Separate system messages from the rest
  const systemMessages = messages.filter((m) => m.role === "system");
  const nonSystemMessages = messages.filter((m) => m.role !== "system");

  // Convert to Anthropic format
  const anthropicMessages = await Promise.all(nonSystemMessages.map(async (msg) => {
    // Handle array content (text + images)
    if (Array.isArray(msg.content)) {
      const contentBlocks = await Promise.all(msg.content.map(async (c) => {
        if (typeof c === "string") {
          return { type: "text", text: c };
        }
        if ("type" in c && c.type === "image_url" && "image_url" in c) {
          // Convert image_url format to Anthropic's image format
          const imageUrl = c.image_url.url;
          // Anthropic expects base64 or source object
          if (imageUrl.startsWith("data:")) {
            const [header, base64] = imageUrl.split(",");
            const mediaType = header.match(/data:([^;]+)/)?.[1] || "image/jpeg";
            return {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            };
          }
          // For URLs, fetch and convert to base64
          try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
              console.warn(`[LLM] Failed to fetch image from ${imageUrl}: ${response.status}`);
              return { type: "text", text: "" };
            }
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Detect content type from URL or response headers
            const contentType = response.headers.get("content-type") || "";
            const urlLower = imageUrl.toLowerCase();
            const isHeic = contentType.includes("heic") || contentType.includes("heif") ||
                          urlLower.endsWith(".heic") || urlLower.endsWith(".heif");

            // Convert HEIC to JPEG, or resize/compress other formats
            let processedBuffer: Buffer;
            let mediaType: string;

            if (isHeic) {
              // Convert HEIC to JPEG using heic-convert (pure JS/wasm)
              // sharp on Render's Linux doesn't include libheif
              try {
                const jpegBuffer = await heicConvert({
                  buffer,
                  format: 'JPEG',
                  quality: 0.85
                });
                // Now resize the JPEG with sharp
                processedBuffer = await sharp(Buffer.from(jpegBuffer))
                  .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
                  .jpeg({ quality: 85 })
                  .toBuffer();
                mediaType = "image/jpeg";
                console.log(`[LLM] Converted HEIC image to JPEG: ${imageUrl}`);
              } catch (heicError) {
                console.warn(`[LLM] HEIC conversion failed for ${imageUrl}:`, heicError);
                // Graceful fallback: skip this image
                return { type: "text", text: "" };
              }
            } else {
              // Resize and compress to cap at ~4MB
              const format = contentType.includes("png") ? "png" :
                           contentType.includes("webp") ? "webp" :
                           contentType.includes("gif") ? "gif" : "jpeg";

              const sharpInstance = sharp(buffer).resize(1600, 1600, { fit: "inside", withoutEnlargement: true });

              if (format === "png") {
                processedBuffer = await sharpInstance.png({ quality: 85 }).toBuffer();
                mediaType = "image/png";
              } else if (format === "webp") {
                processedBuffer = await sharpInstance.webp({ quality: 85 }).toBuffer();
                mediaType = "image/webp";
              } else if (format === "gif") {
                processedBuffer = await sharpInstance.gif().toBuffer();
                mediaType = "image/gif";
              } else {
                processedBuffer = await sharpInstance.jpeg({ quality: 85 }).toBuffer();
                mediaType = "image/jpeg";
              }
            }

            const base64 = processedBuffer.toString("base64");
            return {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            };
          } catch (error) {
            console.warn(`[LLM] Failed to process image from ${imageUrl}:`, error);
            return { type: "text", text: "" };
          }
        }
        if ("text" in c) {
          return { type: "text", text: c.text };
        }
        return { type: "text", text: "" };
      }));

      const filteredBlocks = contentBlocks.filter((block) => block.type === "image" || (block.type === "text" && block.text));

      return {
        role: msg.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: filteredBlocks as Array<{ type: "text"; text: string } | { type: "image"; source: { type: "base64"; media_type: string; data: string } }>,
      };
    }

    // Handle string content
    let content: string;
    if (typeof msg.content === "string") {
      content = msg.content;
    } else {
      content = "text" in msg.content ? msg.content.text : "";
    }

    return {
      role: msg.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content,
    };
  }));

  const systemPrompt = systemMessages
    .map((m) => (typeof m.content === "string" ? m.content : ""))
    .join("\n");

  const client = new Anthropic({
    apiKey: ENV.anthropicApiKey,
  });

  const response = await client.messages.create({
    model: process.env.DIAG_MODEL || "claude-sonnet-4-6",
    max_tokens: maxTokens || max_tokens || 2048,
    system: systemPrompt || undefined,
    messages: anthropicMessages as any, // Type cast needed for image content blocks
  });

  // Transform Anthropic response to OpenAI format
  const content =
    response.content.length > 0 && "text" in response.content[0]
      ? response.content[0].text
      : "";

  return {
    id: response.id,
    created: Math.floor(Date.now() / 1000),
    model: response.model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content,
        },
        finish_reason: response.stop_reason || null,
      },
    ],
    usage: {
      prompt_tokens: response.usage.input_tokens,
      completion_tokens: response.usage.output_tokens,
      total_tokens: response.usage.input_tokens + response.usage.output_tokens,
    },
  };
}
