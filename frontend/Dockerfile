# Imagen base oficial de Node
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app
RUN npm run build

# Instalar servidor estático para servir la app (usaremos 'serve')
RUN npm install -g serve

# Exponer el puerto del servidor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["serve", "-s", "dist", "-l", "3000"]
