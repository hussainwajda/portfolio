# Builder stage
FROM node:18-alpine as builder

WORKDIR /app
COPY . .
RUN npm install --force && npm run build

# Final stage with Caddy
FROM caddy:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/caddy

# Optional: Copy your custom Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
