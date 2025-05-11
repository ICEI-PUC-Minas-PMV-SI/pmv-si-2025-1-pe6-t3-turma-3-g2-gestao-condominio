import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalEsqueciSenha from '../components/ModalEsqueciSenha';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: '0 1rem',
    backgroundColor: '#FFF5E3',
  },
  logo: {
    width: '200px',
    marginBottom: '2rem',
    border: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'transparent',
  },
  input: {
    marginBottom: '1.5rem',
    padding: '0.75rem 1rem',
    border: 'none',
    borderBottom: '2px solid #333',
    outline: 'none',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    color: '#000',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#0A3D2C',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  forgot: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#000',
    textDecoration: 'underline',
    fontSize: '0.9rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

function decodeToken(token) {
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('authToken', token);

      const decoded = decodeToken(token);
      const userId = decoded?.id;

      if (userId === 1) {
        navigate('/admin/ocorrencias');
      } else {
        navigate('/ocorrencias');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const handlePasswordReset = (email) => {
    console.log('Email enviado para redefinição de senha:', email);
    // Aqui você pode chamar sua API real para enviar e-mail de redefinição
  };

  return (
    <div style={styles.container}>
      <img
        src="/logo-habitare.jpg"
        alt="Habitare Gestão de Condomínios"
        style={styles.logo}
      />

      <form style={styles.form} onSubmit={handleLogin}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>

      <button
        style={styles.forgot}
        onClick={() => setIsModalOpen(true)}
      >
        Esqueceu sua senha?
      </button>

      <ModalEsqueciSenha
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReset={handlePasswordReset}
      />
    </div>
  );
}

export default Login;
