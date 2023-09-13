# pull official base image
FROM node:16.15-alpine

# set working directory
WORKDIR /usr/src/app

# copy .npmrc to get npm packages from Manulife Artifactory
COPY .npmrc ./

# copy package.json and package-lock.json to get dependencies
COPY package*.json ./

# install npm dependencies
RUN npm ci

# copy other project files (unless ignored in .dockerignore)
COPY . . 

# describe that the container is listening on port 3000
EXPOSE 3000

# start container with npm run start
CMD [ "npm", "run", "start" ]