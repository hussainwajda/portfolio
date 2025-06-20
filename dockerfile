FROM caddy:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/caddy

# Optional: Copy your custom Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
