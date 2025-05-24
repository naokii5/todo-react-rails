# Ruby 公式 Dev Container イメージ
FROM mcr.microsoft.com/devcontainers/ruby:3

# 追加したい OS パッケージがあればここで
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential libssl-dev libreadline-dev \
      zlib1g-dev sqlite3 libsqlite3-dev git curl \
 && rm -rf /var/lib/apt/lists/*