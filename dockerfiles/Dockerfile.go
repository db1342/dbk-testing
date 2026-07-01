# syntax=docker/dockerfile:1
# ---------------------------------------------------------------------------
# Static Go binary built with cross-compilation, shipped in scratch.
# ---------------------------------------------------------------------------

ARG GO_VERSION=1.22

FROM --platform=$BUILDPLATFORM golang:${GO_VERSION}-bookworm AS build

# TARGETOS / TARGETARCH are provided automatically by BuildKit.
ARG TARGETOS
ARG TARGETARCH
ARG VERSION=dev

ENV CGO_ENABLED=0 \
    GOOS=${TARGETOS} \
    GOARCH=${TARGETARCH}

WORKDIR /src

# Download modules first so the layer caches independently of source changes.
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build \
        -trimpath \
        -ldflags="-s -w -X 'main.version=${VERSION}'" \
        -o /out/app \
        ./cmd/server

# tini gives us a real PID 1 for signal forwarding + zombie reaping.
FROM debian:bookworm-slim AS tini
RUN apt-get update && apt-get install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*

FROM scratch AS runtime

# Certs + a nonroot passwd entry, copied from the toolchain image.
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=tini /usr/bin/tini /tini
COPY --from=build /out/app /app

USER 65532:65532
EXPOSE 8080/tcp

ENTRYPOINT ["/tini", "--", "/app"]
CMD ["--listen", ":8080"]
