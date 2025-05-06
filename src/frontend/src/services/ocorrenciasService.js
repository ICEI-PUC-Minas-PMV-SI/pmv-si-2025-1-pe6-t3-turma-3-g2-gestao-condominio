import axios from 'axios';
import { toast } from 'react-toastify'; // Usando React Toastify para exibir mensagens de erro

// Configuração base para a API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base da API
});

// Função para buscar ocorrências do usuário logado
export const getOcorrencias = async () => {
  const token = localStorage.getItem('authToken'); // Recupera o token do localStorage

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.get('/ocorrencias', {
      headers: {
        Authorization: token, // Envia o token no cabeçalho Authorization
      },
    });
    return response.data; // Retorna os dados das ocorrências
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar ocorrências';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para criar uma nova ocorrência
export const createOcorrencia = async (titulo, descricao) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.post(
      '/ocorrencias',
      { titulo, descricao },
      {
        headers: { Authorization: token },
      }
    );
    toast.success('Ocorrência criada com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao criar ocorrência';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para buscar uma ocorrência por ID
export const getOcorrenciaById = async (id) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.get(`/ocorrencias/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar ocorrência';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para atualizar uma ocorrência
export const updateOcorrencia = async (id, titulo, descricao) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.put(
      `/ocorrencias/${id}`,
      { titulo, descricao },
      {
        headers: { Authorization: token },
      }
    );
    toast.success('Ocorrência atualizada com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Erro ao atualizar ocorrência';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para excluir uma ocorrência
export const deleteOcorrencia = async (id) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.delete(`/ocorrencias/${id}`, {
      headers: { Authorization: token },
    });
    toast.success('Ocorrência excluída com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Erro ao excluir ocorrência';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};