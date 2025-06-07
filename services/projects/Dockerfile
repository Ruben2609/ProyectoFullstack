# Imagen base de Node.js
FROM node:18

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto usado por el microservicio
EXPOSE 5001

# Comando para ejecutar el microservicio
CMD ["node", "server.js"]
