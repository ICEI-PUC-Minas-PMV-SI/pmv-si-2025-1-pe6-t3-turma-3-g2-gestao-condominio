import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

type Visitante = {
  id: number;
  titulo: string;
  descricao: string;
};

export function useVisitantes() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchVisitantes = async () => {
    try {
      setLoading(true);
      setErro(null);

      const token = await obterToken();
      if (!token) throw new Error('Token não encontrado');

      console.log("API_URL:", API_URL);

      const response = await fetch(`${API_URL}/api/visitantes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar ocorrências');
      }

      setVisitantes(data);
    } catch (err: any) {
      console.error("Erro ao buscar ocorrências:", err);
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitantes();
  }, []);

  return { visitantes, loading, erro, refetch: fetchVisitantes };
}
