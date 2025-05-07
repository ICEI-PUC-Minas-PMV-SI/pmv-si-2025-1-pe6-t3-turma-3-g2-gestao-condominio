import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000/api' });

const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return { Authorization: token };
};

export const getMoradoresAdmin = async () => {
  const res = await api.get('/moradores', { headers: getHeaders() });
  return res.data;
};

export const criarMorador = async (dados) => {
  const res = await api.post('/moradores', dados, { headers: getHeaders() });
  return res.data;
};

export const atualizarMorador = async (id, dados) => {
  const res = await api.put(`/moradores/${id}`, dados, { headers: getHeaders() });
  return res.data;
};

export const deletarMorador = async (id) => {
  const res = await api.delete(`/moradores/${id}`, { headers: getHeaders() });
  return res.data;
};

export const getMoradorDoUsuario = async (id) => {
  const res = await api.get(`/moradores/${id}`, { headers: getHeaders() });
  return res.data;
};