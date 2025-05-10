// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Coloque aqui o endpoint real da sua API
});

export default api;
