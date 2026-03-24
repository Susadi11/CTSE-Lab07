# ─── Gateway Service Dockerfile ───────────────────────────────────────────────
# Multi-stage optimized build for Azure Container Apps deployment

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm install --production

# Copy application source code
COPY . .

# Expose the service port
EXPOSE 3000

# Start the gateway service
CMD ["node", "server.js"]
