FROM node as auth-build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build



## nginx stage

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=auth-build /app/dist /usr/share/nginx/html