FROM node:16.12.0

# Create app directory
RUN mkdir -p /usr/src/personal-stock-screener
WORKDIR /usr/src/personal-stock-screener

# Install app dependencies
COPY package.json /usr/src/personal-stock-screener
RUN npm install

# Bundle app source
COPY . /usr/src/personal-stock-screener

# Build arguments
ARG NODE_VERSION=16.12.0

# Environment
ENV NODE_VERSION $NODE_VERSION