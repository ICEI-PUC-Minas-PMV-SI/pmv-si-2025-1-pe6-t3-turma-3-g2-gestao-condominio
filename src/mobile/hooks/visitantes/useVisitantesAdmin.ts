import { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

export function useVisitantesAdmin() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;
  const [visitantes, setVisitantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const fetchVisitantesAdmin = useCallback(async () => {
    setLoading(true);
    setErro(null);

    try {
      const token = await obterToken();

      const response = await fetch(`${API_URL}/api/listar/visitantes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao buscar ocorrências admin');
      }

      const data = await response.json();
      setVisitantes(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchVisitantesAdmin();
  }, [fetchVisitantesAdmin]);

  return { visitantes, loading, erro, refetch: fetchVisitantesAdmin };
}
