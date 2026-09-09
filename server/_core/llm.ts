import Anthropic from "@anthropic-ai/sdk";
import { ENV } from "./env";

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
  const anthropicMessages = nonSystemMessages.map((msg) => {
    // Handle array content (text + images)
    if (Array.isArray(msg.content)) {
      const contentBlocks = msg.content.map((c) => {
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
          // For URLs, we'd need to fetch and convert - skip for now
          return { type: "text", text: "" };
        }
        if ("text" in c) {
          return { type: "text", text: c.text };
        }
        return { type: "text", text: "" };
      }).filter((block) => block.type === "image" || (block.type === "text" && block.text));

      return {
        role: msg.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: contentBlocks as Array<{ type: "text"; text: string } | { type: "image"; source: { type: "base64"; media_type: string; data: string } }>,
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
  });

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
