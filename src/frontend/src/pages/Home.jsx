import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/'); // Se não houver token, redireciona para o login
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bem-vindo à Home!</h1>
      <p>Conteúdo da Home</p>
    </div>
  );
};

export default Home;
