# Use a stable Node.js version as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/app.js"]
