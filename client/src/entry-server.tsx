import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Router } from "wouter";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import { getSeoMeta, type SeoMeta } from "@shared/seo";
import App from "./App";

export type RenderResult = {
  html: string;
  dehydratedState: unknown;
  head: SeoMeta;
};

/**
 * Render indexable marketing pages to HTML. Private routes intentionally remain
 * client-rendered and noindexed so no session-specific data enters page markup.
 */
export async function render(url: string): Promise<RenderResult> {
  const queryIndex = url.indexOf("?");
  const ssrPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const ssrSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  const head = getSeoMeta(url);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });

  if (head.noindex) {
    return { html: "", dehydratedState: dehydrate(queryClient), head };
  }

  // Plain useQuery hooks do not request data during renderToString. The client
  // keeps its existing query behavior after hydration.
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });

  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={ssrPath} ssrSearch={ssrSearch}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );

  return { html, dehydratedState: dehydrate(queryClient), head };
}
