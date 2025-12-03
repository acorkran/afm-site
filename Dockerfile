# AFM Website - Production Container
FROM nginx:alpine

# Copy static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY whitepaper.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY whitepaper-styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY whitepaper-charts.js /usr/share/nginx/html/
COPY logo.svg /usr/share/nginx/html/
COPY *.md /usr/share/nginx/html/

# Create nginx configuration for proper routing
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_types text/css application/javascript text/javascript application/json; \
    \
    # Cache static assets \
    location ~* \.(css|js|svg|md)$ { \
        expires 1h; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Proxy webhook requests to host webhook server \
    location /webhook { \
        proxy_pass http://host.docker.internal:9000/webhook; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Hub-Signature-256 $http_x_hub_signature_256; \
        proxy_set_header X-GitHub-Event $http_x_github_event; \
        proxy_set_header Content-Type $content_type; \
    } \
    \
    # Serve index.html for root \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Health check endpoint \
    location /health { \
        access_log off; \
        return 200 "healthy\n"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
