# Usa la imagen oficial de Node.js versión 18 como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias 
# Esto permite aprovechar la caché de Docker para acelerar futuras construcciones
COPY package*.json ./

# Instala las dependencias definidas en el package.json
RUN npm install

# Copia el resto del código fuente de la aplicación al contenedor
COPY . .

# Expone el puerto 4000 en el contenedor para que pueda ser accedido desde el host o desde otros contenedores
EXPOSE 4000

# Define el comando por defecto para iniciar la aplicación
CMD ["node", "gateway.js"]
