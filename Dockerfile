FROM node:12.18.0-alpine3.12

WORKDIR /usr/app

# Set up environment variables
ENV PATH ./node_modules/.bin:$PATH
ENV NODE_PATH ./

# Copy service source
COPY package.json yarn.lock dist ./

# Create a new group and add new user
RUN addgroup -S admin && adduser -S -g admin admin && chown -R admin:admin .

# Switch to new user
USER admin

# Install dependencies
RUN yarn install --prod --no-progress --prefer-offline --ignore-optional --update-checksums

# Start the service
CMD ["node", "main"]
