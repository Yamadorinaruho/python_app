# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json /app/

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the container
COPY . /app

# Set environment variable for OpenSSL legacy support
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the app
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
