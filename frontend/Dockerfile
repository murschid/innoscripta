FROM node:18-alpine
WORKDIR /app/frontend
ENV PATH /app/frontend/node_modules/.bin:$PATH
COPY package*.json .
COPY package-lock.json .
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]