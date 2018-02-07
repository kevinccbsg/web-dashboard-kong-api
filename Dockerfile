FROM node:carbon
RUN apt-get update && apt-get install -y iputils-ping

RUN mkdir -p /user/src/app

# Create app directory
WORKDIR /user/src/app

copy package.json ./

RUN npm install

# bundle app source
COPY . .

# create forntend
RUN npm run webpack

# create backend
RUN npm run build-server

EXPOSE 3000

cmd ["npm", "start"]
