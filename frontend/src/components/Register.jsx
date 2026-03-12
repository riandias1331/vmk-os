import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: { textAlign: 'center', marginBottom: '30px', color: '#333' },
    input: {
      width: '100%',
      padding: '12px',
      margin: '8px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '20px'
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '15px'
    },
    link: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#666'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 VMK OS - Cadastro</h1>
      
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        
        <input
          type="password"
          placeholder="Senha (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          minLength={6}
        />
        
        <button type="submit" style={styles.button}>
          Cadastrar
        </button>
      </form>
      
      <p style={styles.link}>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}