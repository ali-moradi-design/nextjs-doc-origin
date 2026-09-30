# Multi-stage build: each FROM starts a new stage. Only the last stage
# becomes the final image, so build tools and full node_modules stay out.

# 1. deps: install node_modules from the lockfile.
FROM node:22-alpine AS deps
WORKDIR /app
# pnpm version comes from "packageManager" in package.json.
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 2. builder: run next build (output: "standalone").
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* values are inlined into the JavaScript at build time,
# so they must be given here: docker build --build-arg ...
ARG NEXT_PUBLIC_BUILD_LABEL=docker
ENV NEXT_PUBLIC_BUILD_LABEL=$NEXT_PUBLIC_BUILD_LABEL
# Read by the static page at build time (frozen into its HTML).
ARG APP_ENV_NAME=build-time
ENV APP_ENV_NAME=$APP_ENV_NAME
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# 3. runner: the final image. Only the standalone output, no pnpm.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Runtime default; override it with: docker run -e APP_ENV_NAME=...
ENV APP_ENV_NAME=docker-default
# Do not run the server as root.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
