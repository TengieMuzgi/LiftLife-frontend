FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3000

CMD ["npm", "start"]
