# Étape 1: Construire l'application
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration production

# Étape 2: Préparer l'image de production avec Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
