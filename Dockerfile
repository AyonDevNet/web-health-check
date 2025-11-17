FROM node:alpine

# Create app directory
WORKDIR /app

# Copy all static files (HTML, CSS, JS, images)
COPY . /app

# Install http-server globally
RUN npm install -g http-server

# Expose port 5000
EXPOSE 5000

# Start HTTP server on port 5000
CMD ["http-server", "-p", "5000", "--cors"]
