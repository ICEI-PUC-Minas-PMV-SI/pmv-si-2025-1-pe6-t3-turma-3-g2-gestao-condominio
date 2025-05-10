import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const getToken = () => localStorage.getItem('authToken');

export const createVisitante = async (dadosVisitante) => {
  const token = getToken();

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.post('/visitantes', dadosVisitante, {
      headers: { Authorization: token },
    });
    toast.success('Visitante criado com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao criar visitante';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getVisitantes = async () => {
  const token = getToken();

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const decoded = jwtDecode(token);
    const isAdmin = decoded?.id === 1;
    const url = isAdmin ? '/visitantes' : '/listar/visitantes';

    const response = await api.get(url, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar visitantes';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getVisitanteById = async (id) => {
  const token = getToken();

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
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateVisitante = async (id, dadosAtualizados) => {
  const token = getToken();

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const decoded = jwtDecode(token);
    const isAdmin = decoded?.id === 1;
    const url = isAdmin ? `/admin/visitantes/${id}` : `/visitantes/${id}`;

    const response = await api.put(url, dadosAtualizados, {
      headers: { Authorization: token },
    });

    toast.success('Visitante atualizado com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao atualizar visitante';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const cancelarVisitante = async (id) => {
  const token = getToken();

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const decoded = jwtDecode(token);
    const isAdmin = decoded?.id === 1;
    const url = isAdmin ? `/admin/visitantes/${id}` : `/visitantes/${id}`;

    const response = await api.delete(url, {
      headers: { Authorization: token },
    });

    toast.success('Visitante cancelado com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao cancelar visitante';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
