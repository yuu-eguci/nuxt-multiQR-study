FROM node:24.22.1-bookworm-slim AS build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn lint && yarn typecheck && yarn test && yarn build

FROM node:24.22.1-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/.output /app/.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
