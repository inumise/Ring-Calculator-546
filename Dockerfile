# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV VITE_BASE_PATH=/
RUN npm run build

# Runtime stage - use Node with serve (simpler than nginx)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built assets
COPY --from=build /app/dist ./dist

# Railway sets PORT env var
EXPOSE 3000

# Start serve with SPA fallback, binding to 0.0.0.0 and $PORT
CMD ["sh", "-c", "./node_modules/.bin/serve -s dist -l tcp://0.0.0.0:${PORT:-3000}"]
