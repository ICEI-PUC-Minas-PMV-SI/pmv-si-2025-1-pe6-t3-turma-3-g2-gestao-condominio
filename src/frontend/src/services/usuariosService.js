import api from './api'; // ✅ Importa uma única vez
import { toast } from 'react-toastify';

const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const atualizarUsuario = async (id, dadosAtualizados) => {
  try {
    const res = await api.put(`/usuarios/${id}`, dadosAtualizados, {
      headers: getHeaders(),
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 400) {
      console.error("Erro de validação:", error.response.data.error);
      alert(error.response.data.error);
    } else {
      console.error("Erro ao atualizar usuário:", error);
    }
    throw error;
  }
};

export const criarUsuario = async (dadosUsuario) => {
  try {
    const res = await api.post('/auth/register', dadosUsuario);
    return res.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    toast.error(error.response?.data?.message || "Erro ao criar usuário");
    throw error;
  }
};

export const deletarUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`, {
      headers: getHeaders() // ✅ Usa a função que já funciona no atualizar
    });
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao excluir usuário:', error);
    throw error;
  }
};

export const getUsuarios = async () => {
  try {
    console.log("Chamando a API /usuarios...");
    const res = await api.get('/usuarios', { headers: getHeaders() });
    console.log("Usuários carregados:", res.data);
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};
