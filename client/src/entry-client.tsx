import { createRoot, hydrateRoot } from "react-dom/client";
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { Router } from "wouter";
import superjson from "superjson";
import { UNAUTHED_ERR_MSG } from "@shared/const";
import { trpc } from "@/lib/trpc";
import App from "./App";
import { getLoginUrl } from "./const";
import { installPhoneLinkTracking } from "@shared/phoneTracking";
import { installAttributionCapture } from "@shared/attribution";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError) || typeof window === "undefined") return;
  if (error.message === UNAUTHED_ERR_MSG) window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.query.state.error);
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.mutation.state.error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
      },
    }),
  ],
});

const mountNode = document.getElementById("root");
if (!mountNode) throw new Error("Root mount node is missing");

installPhoneLinkTracking();
installAttributionCapture();

const rawState = (window as Window & { __RQ_STATE__?: unknown }).__RQ_STATE__;
const dehydratedState = rawState
  ? (superjson.deserialize(rawState as Parameters<typeof superjson.deserialize>[0]) as DehydratedState)
  : undefined;
const tree = (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Router>
          <App />
        </Router>
      </HydrationBoundary>
    </QueryClientProvider>
  </trpc.Provider>
);

// Private/noindex routes deliberately receive an empty SSR root, so mount them
// normally instead of attempting to hydrate an empty element.
if (mountNode.firstChild) hydrateRoot(mountNode, tree);
else createRoot(mountNode).render(tree);
