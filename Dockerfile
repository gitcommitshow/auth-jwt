FROM node:17

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
#Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "app.js", "--production"]
