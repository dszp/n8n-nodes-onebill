#!/usr/bin/env bash
# Print the GitHub heading anchor for a CHANGELOG entry.
#
# CHANGELOG headings look like "## 0.2.0 (2026-07-31)".  GitHub slugifies that by
# lowercasing, dropping punctuation other than hyphens, and turning spaces into hyphens,
# which gives "020-2026-07-31".
#
# The date is read from the heading rather than from `date`, so a release cut on a day
# other than the one the entry was written still links to the right place.
#
# Usage: scripts/changelog-anchor.sh 0.2.0
set -euo pipefail

VERSION="${1:?usage: changelog-anchor.sh <version>}"
CHANGELOG="$(dirname "$0")/../CHANGELOG.md"

heading=$(grep -m1 -E "^## ${VERSION}([^0-9]|$)" "$CHANGELOG" || true)
if [ -z "$heading" ]; then
	echo "changelog-anchor: no '## ${VERSION}' heading in CHANGELOG.md" >&2
	exit 1
fi

printf '%s\n' "${heading#\#\# }" \
	| tr '[:upper:]' '[:lower:]' \
	| sed -E 's/[^a-z0-9 -]//g; s/ +/-/g; s/-+$//'
