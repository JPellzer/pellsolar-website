#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:4101}"
SITEMAP="${SITEMAP:-client/public/sitemap.xml}"
failures=0

while IFS= read -r route; do
  body="$(curl -fsS "${BASE}${route}")" || {
    echo "FAIL ${route}: request failed"
    failures=$((failures + 1))
    continue
  }

  title_count="$(printf '%s' "$body" | grep -o '<title>[^<]*</title>' | wc -l | tr -d ' ')"
  h1_count="$(printf '%s' "$body" | grep -o '<h1\b' | wc -l | tr -d ' ')"
  canonical_count="$(printf '%s' "$body" | grep -o '<link rel="canonical" href="[^"]*"' | wc -l | tr -d ' ')"
  root_bytes="$(printf '%s' "$body" | sed -n 's/.*<div id="root">\(.*\)<\/div>.*/\1/p' | wc -c | tr -d ' ')"
  body_bytes="$(printf '%s' "$body" | tr '\n' ' ' | sed -n 's#.*<body[^>]*>\(.*\)</body>.*#\1#p' | wc -c | tr -d ' ')"

  if [[ "$title_count" -ne 1 || "$h1_count" -ne 1 || "$canonical_count" -ne 1 || "$body_bytes" -lt 2000 ]]; then
    echo "FAIL ${route}: title=${title_count} h1=${h1_count} canonical=${canonical_count} root_bytes=${root_bytes} body_bytes=${body_bytes}"
    failures=$((failures + 1))
  else
    echo "PASS ${route}"
  fi
done < <(sed -n 's#.*<loc>https://pellsolar.com\([^<]*\)</loc>.*#\1#p' "$SITEMAP") || true

if (( failures > 0 )); then
  echo "SSR verification failed: ${failures} route(s) need attention."
  exit 1
fi

echo "SSR verification passed for every sitemap route."
