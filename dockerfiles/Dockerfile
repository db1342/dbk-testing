# syntax=docker/dockerfile:1.7
# ---------------------------------------------------------------------------
# Multi-stage build for a Node.js service. Exercises most Dockerfile syntax:
# parser directives, ARG/ENV, heredocs, cache mounts, COPY --from, etc.
# ---------------------------------------------------------------------------

ARG NODE_VERSION=20.11.1
ARG ALPINE_VERSION=3.19

########################
# 1. Dependencies
########################
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps

LABEL org.opencontainers.image.source="https://github.com/db1342/dbk-testing" \
      org.opencontainers.image.description="Fixture image — do not deploy" \
      maintainer="dbk <dbk@example.com>"

ENV NODE_ENV=production \
    PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH"

WORKDIR /app

# Install pnpm and project deps with a BuildKit cache mount.
RUN --mount=type=cache,target=/root/.npm \
    corepack enable && corepack prepare pnpm@9.1.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod=false

########################
# 2. Build
########################
FROM deps AS build

COPY . .
RUN <<-'EOF'
	set -euo pipefail
	echo "Building at $(date --iso-8601=seconds)"
	pnpm run build
	pnpm prune --prod
EOF

########################
# 3. Runtime
########################
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runtime

ARG PORT=3000
ENV NODE_ENV=production \
    PORT=${PORT}

# Create an unprivileged user; never run as root in prod.
RUN addgroup -S app && adduser -S app -G app
USER app:app

WORKDIR /app
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist ./dist
COPY --from=build --chown=app:app /app/package.json ./

EXPOSE ${PORT}
VOLUME ["/app/data"]
STOPSIGNAL SIGTERM

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --spider "http://127.0.0.1:${PORT}/healthz" || exit 1

ENTRYPOINT ["node", "--enable-source-maps"]
CMD ["dist/server.js"]
