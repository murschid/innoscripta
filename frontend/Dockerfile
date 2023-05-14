FROM node:18-alpine
WORKDIR /app/frontend
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . .
EXPOSE 8080
CMD ["npm", "start"]