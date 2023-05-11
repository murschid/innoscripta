FROM node:18-alpine
WORKDIR /app/frontend
# COPY package*.json .
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]