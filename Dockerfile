# FROM nginx
# COPY dist /usr/share/nginx/html

FROM node:19-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

# FROM node:14-alpine AS builder
# WORKDIR /app
# COPY package.json ./
# COPY yarn.lock ./
# RUN yarn install 
# COPY . .
# RUN yarn build

# FROM nginx:1.19-alpine AS server
# COPY --from=builder ./app/build /usr/share/nginx/html

