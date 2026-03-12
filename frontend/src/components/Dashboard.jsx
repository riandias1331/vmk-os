import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        alert('Erro ao deletar usuário');
      }
    }
  };

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      background: 'white',
      borderRadius: '10px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    welcome: { fontSize: '1.2rem', color: '#333' },
    logoutBtn: {
      padding: '10px 20px',
      background: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    th: {
      background: '#007bff',
      color: 'white',
      padding: '15px',
      textAlign: 'left'
    },
    td: { padding: '15px', borderBottom: '1px solid #eee' },
    deleteBtn: {
      padding: '5px 15px',
      background: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer'
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Carregando...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.welcome}>
          👋 Bem-vindo, <strong>{user?.name}</strong> ({user?.email})
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Sair
        </button>
      </div>

      <h2 style={{ marginBottom: '20px' }}>📋 Lista de Usuários</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Criado em</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(userItem => (
            <tr key={userItem._id}>
              <td style={styles.td}>{userItem.name}</td>
              <td style={styles.td}>{userItem.email}</td>
              <td style={styles.td}>
                {new Date(userItem.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td style={styles.td}>
                {userItem._id !== user?._id && (
                  <button 
                    onClick={() => handleDelete(userItem._id)}
                    style={styles.deleteBtn}
                  >
                    Deletar
                  </button>
                )}
                {userItem._id === user?._id && (
                  <span style={{ color: '#666' }}>Você</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}