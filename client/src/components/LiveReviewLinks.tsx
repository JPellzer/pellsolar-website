import { GoogleIcon, YelpIcon } from "./SocialIcons";
import { trpc } from "@/lib/trpc";

type LiveReviewLinksProps = {
  tone?: "light" | "dark";
  className?: string;
  compact?: boolean;
};

export function LiveReviewLinks({ tone = "light", className = "", compact = false }: LiveReviewLinksProps) {
  const { data: googleReview } = trpc.reviewSummary.google.useQuery(undefined, {
    staleTime: 6 * 60 * 60 * 1000,
    retry: 1,
  });
  const labelClass = tone === "dark" ? "text-white" : "text-gray-800";
  const detailClass = tone === "dark" ? "text-white/70" : "text-gray-500";
  const cardClass = compact
    ? "flex items-center gap-2 no-underline"
    : `flex items-center gap-3 rounded-lg no-underline ${tone === "dark" ? "" : "border border-gray-200 bg-white px-5 py-3 hover:shadow-md"}`;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      <a href="https://www.google.com/search?q=Pell+Solar+reviews" target="_blank" rel="noopener noreferrer" className={cardClass}>
        <GoogleIcon size={compact ? 30 : 24} />
        <span>
          <span className={`block font-bold text-sm ${labelClass}`}>Google Reviews</span>
          <span className={`block text-xs ${detailClass}`}>
            {googleReview ? `${googleReview.rating.toFixed(1)} · ${googleReview.reviewCount} current Google reviews` : "View current Google reviews"}
          </span>
        </span>
      </a>
      <a href="https://www.yelp.com/biz/pell-solar-ontario" target="_blank" rel="noopener noreferrer" className={cardClass}>
        <YelpIcon size={compact ? 30 : 24} />
        <span>
          <span className={`block font-bold text-sm ${labelClass}`}>Yelp Reviews</span>
          <span className={`block text-xs ${detailClass}`}>View current reviews on Yelp</span>
        </span>
      </a>
    </div>
  );
}
