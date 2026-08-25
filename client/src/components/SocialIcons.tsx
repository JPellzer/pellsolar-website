// Brand icons — proper SVG logos for Google, Yelp, YouTube

// Google multicolor "G" SVG logo
export function GoogleIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      style={{ flexShrink: 0 }}
      aria-label="Google"
    >
      <circle cx="24" cy="24" r="24" fill="#ffffff" />
      <path
        fill="#4285F4"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#34A853"
        d="M6.3 14.7l6.6 4.8C14.5 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36.5 24 36.5c-5.2 0-9.6-3.2-11.3-7.8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#EA4335"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.2 5.2C37 38.2 44 33 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

// Yelp burst SVG logo
export function YelpIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 384 512"
      style={{ flexShrink: 0 }}
      aria-label="Yelp"
    >
      <path
        fill="#D32323"
        d="M42.9 240.3l99.6 48.6c19.2 9.4 16.2 37.5-4.5 42.7L30.5 358.5c-3.2.8-6.4.9-9.6.3s-6.2-1.8-8.9-3.7-4.9-4.3-6.6-7.1-2.7-5.9-3.1-9.2c-3.3-28.8-.2-57.9 9-85.3 1-3.1 2.7-5.9 4.9-8.3s4.9-4.2 7.9-5.5 6.2-1.8 9.5-1.8 6.4.9 9.3 2.3zm44 239.3c23.8 16.3 50.9 27.3 79.4 32.1 3.2.6 6.5.4 9.6-.4s6.1-2.3 8.6-4.4 4.6-4.6 6-7.5 2.3-6.1 2.4-9.4l3.9-110.8c.7-21.3-25.5-31.9-39.8-16.1L82.8 445.5c-2.2 2.4-3.8 5.3-4.8 8.4s-1.3 6.4-.9 9.6 1.5 6.3 3.1 9.1 3.9 5.2 6.6 7zM232.2 369.7l58.8 94c1.7 2.8 4 5.1 6.8 6.9s5.8 3 9 3.5 6.5.3 9.7-.5 6.1-2.4 8.6-4.4c22.3-18.4 40.3-41.5 52.7-67.6 1.4-2.9 2.1-6.1 2.2-9.4s-.6-6.5-1.9-9.4-3.2-5.7-5.6-7.8-5.2-3.9-8.3-4.9L258.7 335.7c-20.3-6.5-37.8 15.8-26.5 33.9zM380.6 237.4c-11.5-26.5-28.7-50.2-50.4-69.3-2.4-2.1-5.3-3.7-8.4-4.7s-6.4-1.2-9.6-.8-6.3 1.5-9.1 3.2-5.1 4-6.9 6.7l-62 91.9c-11.9 17.7 4.7 40.6 25.2 34.7L366 268.6c3.1-.9 6-2.5 8.5-4.6s4.5-4.7 5.8-7.7 2.1-6.2 2.2-9.4-.6-6.5-1.9-9.5zM62.1 30.2c-2.8 1.4-5.4 3.3-7.4 5.7s-3.6 5.2-4.5 8.2-1.2 6.2-.9 9.3 1.3 6.1 2.9 8.9L156.3 242.6c11.7 20.2 42.6 11.9 42.6-11.4V22.9c0-3.1-.6-6.3-1.8-9.2s-3.1-5.5-5.4-7.6-5-3.8-8-4.8-6.1-1.4-9.3-1.2c-39 3.1-77 13.3-112.3 30.1z"
      />
    </svg>
  );
}

// YouTube play button SVG logo
export function YouTubeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      style={{ flexShrink: 0 }}
      aria-label="YouTube"
    >
      <circle cx="24" cy="24" r="24" fill="#FF0000" />
      <path
        fill="white"
        d="M33 24l-13 7.5V16.5L33 24z"
      />
    </svg>
  );
}

// Default export for use in About page
export default function SocialIcons() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <a href="https://www.yelp.com/biz/pell-solar-ontario" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 no-underline">
        <YelpIcon size={56} />
        <div className="text-white text-xs">Yelp</div>
        <div className="text-white/60 text-xs">View current reviews</div>
      </a>
      <a href="https://g.page/r/pell-solar" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 no-underline">
        <GoogleIcon size={56} />
        <div className="text-white text-xs">Google</div>
        <div className="text-white/60 text-xs">View current reviews</div>
      </a>
      <a href="https://www.youtube.com/@pellsolar" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 no-underline">
        <YouTubeIcon size={56} />
        <div className="text-white/70 text-sm font-bold">YouTube</div>
        <div className="text-white text-xs">Watch Our Videos</div>
        <div className="text-white/60 text-xs">&nbsp;</div>
      </a>
    </div>
  );
}
