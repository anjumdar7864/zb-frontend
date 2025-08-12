# Use the official Node.js 16.10 image as the base image for the build stage
FROM node:16.10 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the Angular app files to the container
COPY . .

RUN npm install --legacy-peer-deps
# Build the Angular app
RUN npm run build

# Use the official Nginx image as the base image for the production stage
FROM nginx:1.16.1 as production

# Copy the Nginx configuration file to the container
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app files to the Nginx document root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
