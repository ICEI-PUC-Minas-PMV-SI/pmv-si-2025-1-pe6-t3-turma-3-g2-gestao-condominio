import axios from 'axios';
import { toast } from 'react-toastify';

// Configuração da API para interagir com o backend
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base da API
});

// Função para listar todas as ocorrências (admin)
export const getOcorrenciasAdmin = async () => {
  const token = localStorage.getItem('authToken'); // Recupera o token do localStorage

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.get('/listar/ocorrencias', {
      headers: {
        Authorization: token, // Envia o token no cabeçalho Authorization
      },
    });
    return response.data; // Retorna as ocorrências
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar ocorrências.';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Função para obter os detalhes de uma ocorrência específica (admin)
export const getOcorrenciaDetailsAdmin = async (id) => {
  const token = localStorage.getItem('authToken'); // Recupera o token do localStorage

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.get(`/listar/ocorrencias/${id}`, {
      headers: {
        Authorization: token, // Envia o token no cabeçalho Authorization
      },
    });
    return response.data; // Retorna os detalhes da ocorrência
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar detalhes da ocorrência.';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Função para atualizar o status de uma ocorrência (admin)
export const updateOcorrenciaStatusAdmin = async (id, status) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Usuário não autenticado.');
      throw new Error('Usuário não autenticado.');
    }
    try {
      const response = await api.put(
        `/ocorrencias/status/${id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success('Status atualizado com sucesso!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar o status.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };