# Utiliser l’image de Node.js comme base
FROM node:18-alpine

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port de l’application (par défaut Next.js utilise le port 3000)
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev"]
