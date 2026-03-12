# 🚀 VMK OS - MERN Stack Base

Sistema base para gerenciamento de usuários com autenticação JWT.

## 🛠️ Tecnologias

- **MongoDB** - Banco de dados
- **Express.js** - Framework backend
- **React** - Biblioteca frontend
- **Node.js** - Runtime
- **JWT** - Autenticação
- **Docker** - Containerização

## 📦 Instalação

### Sem Docker
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev




##

docker-compose up --build


##

🔑 Endpoints da API
POST /api/auth/register - Cadastro

POST /api/auth/login - Login

GET /api/users - Listar usuários (protegido)

GET /api/users/:id - Buscar usuário (protegido)

DELETE /api/users/:id - Deletar usuário (protegido)

🌐 Acessos
Frontend: http://localhost:5173

Backend API: http://localhost:5000

MongoDB: localhost:27017

📁 Estrutura
text
vmk-os/
├── backend/     # API Express + MongoDB
├── frontend/    # React + Vite
└── docker-compose.yml
👨‍💻 Autor
Vinicius - VMK OS

text

---

## **🚀 Como executar**

### **Opção 1: Sem Docker (mais simples para aprender)**
```bash
# Terminal 1 - MongoDB
# (certifique-se de ter MongoDB instalado ou use MongoDB Atlas)

# Terminal 2 - Backend
cd backend
npm install
npm run dev

# Terminal 3 - Frontend
cd frontend
npm install
npm run dev
Opção 2: Com Docker (recomendado)
bash
# Na raiz do projeto
docker-compose up --build
📱 Funcionalidades
✅ Cadastro de usuários
✅ Login com JWT
✅ Listagem de usuários
✅ Deleção de usuários
✅ Rotas protegidas
✅ Interface simples e funcional

VMK OS - Um ponto de partida sólido para seus projetos MERN! 🎯



# Primeira vez (constrói as imagens)
docker-compose up --build

# Depois (só sobe)
docker-compose up

# Em background
docker-compose up -d

# Ver logs
docker-compose logs -f