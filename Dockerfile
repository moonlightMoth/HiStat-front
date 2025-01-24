FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm install axios
RUN npm run build


FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/histat
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

