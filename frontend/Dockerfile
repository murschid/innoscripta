FROM node:18-alpine
WORKDIR /app/frontend
COPY package*.json .
RUN npm install
# RUN npm install -g react-scripts@5.0.1 --silent
COPY . .
EXPOSE 8080
CMD ["npm", "start"]