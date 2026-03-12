const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Conectar ao MongoDB
connectDB();

const app = express();

// =============================================
// MIDDLEWARES
// =============================================

// CORS - permite requisições do frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Parse URL encoded
app.use(express.urlencoded({ extended: true }));

// Logger simples (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// =============================================
// ROTAS PÚBLICAS
// =============================================

// Rota de teste / health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo ao VMK OS API',
    version: '1.0.0',
    status: 'online'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// =============================================
// ROTAS DA API
// =============================================

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// =============================================
// TRATAMENTO DE ERROS
// =============================================

// Rota não encontrada (404)
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  
  res.status(status).json({
    message,
    error: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      details: err
    } : {}
  });
});

module.exports = app;