import { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

export function useOcorrenciasAdmin() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const fetchOcorrenciasAdmin = useCallback(async () => {
    setLoading(true);
    setErro(null);

    try {
      const token = await obterToken();

      const response = await fetch(`${API_URL}/api/listar/ocorrencias`, {
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
      setOcorrencias(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchOcorrenciasAdmin();
  }, [fetchOcorrenciasAdmin]);

  return { ocorrencias, loading, erro, refetch: fetchOcorrenciasAdmin };
}
