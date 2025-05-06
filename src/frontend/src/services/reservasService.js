import axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Função para criar uma nova reserva
export const createReserva = async (dadosReserva) => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token); // Verifica o token recuperado

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.post(
      '/reservas', // A rota pode ser '/reservas' ou outra, conforme a API
      dadosReserva,
      {
        headers: { Authorization: token },
      }
    );
    toast.success('Reserva criada com sucesso!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao criar reserva';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

// Função para buscar reservas do usuário logado
export const getReservas = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Token no frontend:', token);
  
    if (!token) {
      toast.error('Usuário não autenticado.');
      throw new Error('Usuário não autenticado.');
    }
  
    try {
        const decoded = jwtDecode(token); // Decodifica o token
        const isAdmin = decoded?.id === 1; // Considera se user admin id === 1
  
      const url = isAdmin ? '/reservas' : '/listar/reservas'; 
  
      const response = await api.get(url, {
        headers: {
          Authorization: token,
        },
      });
  
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar reservas';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };
  

// Função para buscar uma reserva por ID
export const getReservaById = async (id) => {
  const token = localStorage.getItem('authToken');
  console.log('Token no frontend:', token); // Verifica o token recuperado

  if (!token) {
    toast.error('Usuário não autenticado.');
    throw new Error('Usuário não autenticado.');
  }

  try {
    const response = await api.get(`/reservas/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar reserva';
    toast.error(errorMessage); // Exibe mensagem de erro para o usuário
    throw new Error(errorMessage);
  }
};

export const updateReserva = async (id, dadosAtualizados) => {
    const token = localStorage.getItem('authToken');
    console.log('Token no frontend:', token);
  
    if (!token) {
      toast.error('Usuário não autenticado.');
      throw new Error('Usuário não autenticado.');
    }
  
    try {
      const decoded = jwtDecode(token); // Decodifica o token
      const isAdmin = decoded?.id === 1; // Verifica se é admin
  
      const url = isAdmin ? `/admin/reservas/${id}` : `/reservas/${id}`; // Define a URL com base no tipo de usuário
  
      const response = await api.put(url, dadosAtualizados, {
        headers: { Authorization: token },
      });
  
      toast.success('Reserva atualizada com sucesso!');
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao atualizar reserva';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };    

  export const cancelarReserva = async (id) => {
    const token = localStorage.getItem('authToken');
    console.log('Token no frontend:', token);
  
    if (!token) {
      toast.error('Usuário não autenticado.');
      throw new Error('Usuário não autenticado.');
    }
  
    try {
      const decoded = jwtDecode(token); // Decodifica o token
      const isAdmin = decoded?.id === 1; // Verifica se é admin (ajuste conforme necessário)
  
      const url = isAdmin ? `/admin/reservas/${id}` : `/reservas/${id}`; // Define a URL com base no tipo de usuário
  
      const response = await api.delete(url, {
        headers: { Authorization: token },
      });
  
      toast.success('Reserva cancelada com sucesso!');
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao cancelar reserva';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };
