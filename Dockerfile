FROM node:9-slim
ENV PORT 8080
EXPOSE 8080

# make the 'app' folder the current working directory
WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

COPY . .

# build app for production with minification
RUN npm run build

CMD ["npm", "start"]
