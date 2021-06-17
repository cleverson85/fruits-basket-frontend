FROM node:12-alpine as build
WORKDIR /source

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build -- --aot=true --build-optimizer=true --optimization=true --prod --configuration=production --base-href=/ --output-path=/app/www

FROM nginx:1.21.0-alpine

COPY --from=build /source/entrypoint.sh /usr/share/nginx/html
COPY --from=build /app/www /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
