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
  schema_count="$(printf '%s' "$body" | grep -o 'type="application/ld+json"' | wc -l | tr -d ' ')"
  if [[ "$schema_count" -ne 1 ]]; then
    echo "FAIL ${route}: expected exactly one LocalBusiness JSON-LD script, received ${schema_count}"
    failures=$((failures + 1))
  else
    echo "PASS ${route}"
  fi
done < <(sed -n 's#.*<loc>https://pellsolar.com\([^<]*\)</loc>.*#\1#p' "$SITEMAP") || true

root="$(curl -fsS "${BASE}/")"
for text in "Pell Solar Inc." "1326 Monte Vista Ave #7" "(866) 646-8499" "(714) 455-3401" "CSLB #949122"; do
  if ! grep -Fq "$text" <<< "$root"; then
    echo "FAIL footer NAP: missing ${text}"
    failures=$((failures + 1))
  fi
done

admin="$(curl -fsS "${BASE}/admin")"
if printf '%s' "$admin" | grep -Fq 'type="application/ld+json"'; then
  echo "FAIL /admin: LocalBusiness schema must not appear on private routes"
  failures=$((failures + 1))
fi

if (( failures > 0 )); then
  echo "LocalBusiness verification failed: ${failures} check(s) need attention."
  exit 1
fi

echo "LocalBusiness verification passed for every sitemap route."
