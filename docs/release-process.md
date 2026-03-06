# Release Process

## Prerequisites

- All changes committed and pushed to `main`
- `package.json` version and `OneBill.node.json` `nodeVersion` already bumped and matching
- CHANGELOG.md updated with the new version entry
- CI passing on `main`
- npm OIDC trusted publishing configured for `@dszp/n8n-nodes-onebill`
- GitHub environment "NPM" exists in repo settings

## Steps

### 1. Build and pack

```bash
npm ci
npm run build
npm pack
```

This creates `dszp-n8n-nodes-onebill-<VERSION>.tgz` in the project root.

### 2. Determine version and previous tag

```bash
VERSION=$(node -p "require('./package.json').version")
PREV_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
echo "Releasing v${VERSION}, previous tag: ${PREV_TAG}"
```

### 3. Create the GitHub Release with the .tgz attached

For the **first release** (no previous tag):

```bash
VERSION=$(node -p "require('./package.json').version")
CHANGELOG_ANCHOR=$(echo "${VERSION}" | tr '.' '')

gh release create "v${VERSION}" \
  "dszp-n8n-nodes-onebill-${VERSION}.tgz" \
  --target main \
  --title "v${VERSION}" \
  --notes "$(cat <<EOF
## What's Changed

Initial release of @dszp/n8n-nodes-onebill v${VERSION}.

See [CHANGELOG](https://github.com/dszp/n8n-nodes-onebill/blob/v${VERSION}/CHANGELOG.md#${CHANGELOG_ANCHOR}---$(date +%Y-%m-%d)) for detailed changes.
EOF
)"
```

For **subsequent releases** (previous tag exists):

```bash
VERSION=$(node -p "require('./package.json').version")
PREV_TAG=$(git describe --tags --abbrev=0)
CHANGELOG_ANCHOR=$(echo "${VERSION}" | tr -d '.')

gh release create "v${VERSION}" \
  "dszp-n8n-nodes-onebill-${VERSION}.tgz" \
  --target main \
  --title "v${VERSION}" \
  --notes "$(cat <<EOF
## What's Changed

* ${VERSION} by @dszp

**Full Changelog**: https://github.com/dszp/n8n-nodes-onebill/compare/${PREV_TAG}...v${VERSION}

See [CHANGELOG](https://github.com/dszp/n8n-nodes-onebill/blob/v${VERSION}/CHANGELOG.md#${CHANGELOG_ANCHOR}---$(date +%Y-%m-%d)) for detailed changes.
EOF
)"
```

### 4. Verify

The `release-publish.yml` GitHub Action triggers automatically on the published release and:

1. Checks out the release tag
2. Installs dependencies and builds
3. Verifies the tag matches `package.json` version
4. Publishes to npm with `--provenance --access public` via OIDC trusted publishing

Monitor the action at: https://github.com/dszp/n8n-nodes-onebill/actions

### 5. Update dev branch (optional)

```bash
git pull origin main
git branch -f dev main
git push origin dev --force-with-lease
```

## Quick Reference (copy-paste)

Single block for a subsequent release after version bump is committed and pushed:

```bash
npm ci && npm run build && npm pack
VERSION=$(node -p "require('./package.json').version")
PREV_TAG=$(git describe --tags --abbrev=0)
CHANGELOG_ANCHOR=$(echo "${VERSION}" | tr -d '.')
gh release create "v${VERSION}" \
  "dszp-n8n-nodes-onebill-${VERSION}.tgz" \
  --target main \
  --title "v${VERSION}" \
  --notes "$(cat <<EOF
## What's Changed

* ${VERSION} by @dszp

**Full Changelog**: https://github.com/dszp/n8n-nodes-onebill/compare/${PREV_TAG}...v${VERSION}

See [CHANGELOG](https://github.com/dszp/n8n-nodes-onebill/blob/v${VERSION}/CHANGELOG.md#${CHANGELOG_ANCHOR}---$(date +%Y-%m-%d)) for detailed changes.
EOF
)"
```

The `.tgz` file remains in the project root (it is already `.gitignore`d).
