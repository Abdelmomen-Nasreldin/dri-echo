# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Vite app using npm
RUN npm run build

# Expose the port your app will run on (default for Vite is 3000)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev"]
