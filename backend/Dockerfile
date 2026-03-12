FROM node:18-alpine

WORKDIR /app

# Copia package files
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "run", "dev"]