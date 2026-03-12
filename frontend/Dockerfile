FROM node:18-alpine

WORKDIR /app

# Copia package files
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para iniciar
CMD ["npm", "run", "dev", "--", "--host"]