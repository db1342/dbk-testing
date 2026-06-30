#!/usr/bin/env bash
# Append a fixture marker, commit, and push — creates another PR version for Review.
set -euo pipefail
cd "$(dirname "$0")/.."

msg="${1:-fixture: another version for reactive URL test}"
stamp="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "${stamp} ${msg}" >> fixture-versions.log
git add fixture-versions.log
# Also nudge pricing so the diff is visible in the UI, not only the log.
if [[ -f pricing.html ]]; then
  # Replace or insert a data attribute on <body> with the stamp (idempotent-ish).
  if grep -q 'data-fixture-version=' pricing.html; then
    sed -i.bak "s/data-fixture-version=\"[^\"]*\"/data-fixture-version=\"${stamp}\"/" pricing.html
    rm -f pricing.html.bak
  else
    sed -i.bak "s/<body>/<body data-fixture-version=\"${stamp}\">/" pricing.html
    rm -f pricing.html.bak
  fi
  git add pricing.html
fi

git commit -m "${msg}"
git push -u origin HEAD
echo "Pushed. Open/refresh the PR in Review and watch the Changes tab URL."
