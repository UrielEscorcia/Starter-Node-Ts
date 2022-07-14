FROM node:12.18-slim

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent

WORKDIR /usr/src/app/dist
COPY ./dist .
COPY . .

WORKDIR /usr/src/app
EXPOSE 5000
CMD ["npm", "start"]
