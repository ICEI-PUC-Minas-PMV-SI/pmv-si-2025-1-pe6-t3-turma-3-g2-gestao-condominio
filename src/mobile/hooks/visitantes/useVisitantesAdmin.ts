import { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

type Visitante = {
  _id: string;
  nome: string;
  documento: string;
  apartamento: string;
  dataVisita: string;
  user?: {
    nome: string;
  };
};

export function useVisitantesAdmin() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar visitantes (admin)');
      }

      setVisitantes(data);
    } catch (error: any) {
      console.error("Erro ao buscar visitantes (admin):", error);
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
