# Étape 1: Construire l'application
FROM node:latest as node

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json /app/

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . /app

# Construire l'application pour la production
RUN npm run build -- --configuration production

# Étape 2: Préparer l'image de production avec Nginx
FROM nginx:alpine

# Copier les fichiers de build depuis l'étape de construction
COPY --from=node /app/dist/ /usr/share/nginx/html

# Exposer le port (par défaut 80 pour Nginx)
EXPOSE 80

# Lancer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
