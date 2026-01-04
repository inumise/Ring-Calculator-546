# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app (base path defaults to '/' for Railway/Cloud Run)
RUN npm run build

# Production stage
FROM nginx:alpine

# Install envsubst for PORT substitution
RUN apk add --no-cache gettext

# Copy nginx config template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (Railway will set PORT env var)
EXPOSE 8080

# Use entrypoint to substitute PORT and start nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
