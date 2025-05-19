# .devcontainer/Dockerfile
ARG BASE_IMAGE="ghcr.io/prulloac/base:bookworm"
FROM ${BASE_IMAGE}

# 必要なネイティブ依存だけ入れておく
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
     build-essential libssl-dev libreadline-dev zlib1g-dev \
     sqlite3 libsqlite3-dev \
     git curl \
  && rm -rf /var/lib/apt/lists/*

USER vscode
WORKDIR /workspace
