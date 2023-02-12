FROM node:14.16.0-alpine3.13
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY . .
EXPOSE 8080
CMD [ "npx", "live-server", "." ]