FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build
RUN ls -la dist  # 👈 Перевіримо, що білд є

EXPOSE 3000
CMD ["node", "server/server.js"]
