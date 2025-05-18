FROM node:18-alpine AS builder
WORKDIR /app

COPY . .
RUN npm install -g pnpm && pnpm install
RUN pnpm --filter event run build:dev

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist/apps/event ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod

CMD ["node", "dist/main"]
