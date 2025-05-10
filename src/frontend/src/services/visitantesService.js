import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Função para criar um novo visitante
export const createVisitante = async (dadosVisitante) => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token); // Verifica o token recuperado

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.post(
      '/visitantes', // A rota pode ser '/visitantes' ou outra, conforme a API
      dadosVisitante,
      {
        headers: { Authorization: token },
      }
    );
    toast.success('Visitante criado com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao criar visitante';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para buscar visitantes do usuário logado
export const getVisitantes = async () => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token);

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const decoded = jwtDecode(token); // Decodifica o token
    const isAdmin = decoded?.id === 1; // Considera se user admin id === 1

    const url = isAdmin ? '/visitantes' : '/listar/visitantes';

    const response = await api.get(url, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar visitantes';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Função para buscar um visitante por ID
export const getVisitanteById = async (id) => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token); // Verifica o token recuperado

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.get(`/visitantes/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar visitante';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para atualizar um visitante
export const updateVisitante = async (id, dadosAtualizados) => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token);

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const decoded = jwtDecode(token); // Decodifica o token
    const isAdmin = decoded?.id === 1; // Verifica se é admin

    const url = isAdmin ? `/admin/visitantes/${id}` : `/visitantes/${id}`; // Define a URL com base no tipo de usuário

    const response = await api.put(url, dadosAtualizados, {
      headers: { Authorization: token },
    });

    toast.success('Visitante atualizado com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Erro ao atualizar visitante';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Função para cancelar um visitante
export const cancelarVisitante = async (id) => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token);

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const decoded = jwtDecode(token); // Decodifica o token
    const isAdmin = decoded?.id === 1; // Verifica se é admin (ajuste conforme necessário)

    const url = isAdmin ? `/admin/visitantes/${id}` : `/visitantes/${id}`; // Define a URL com base no tipo de usuário

    const response = await api.delete(url, {
      headers: { Authorization: token },
    });

    toast.success('Visitante cancelado com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Erro ao cancelar visitante';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
