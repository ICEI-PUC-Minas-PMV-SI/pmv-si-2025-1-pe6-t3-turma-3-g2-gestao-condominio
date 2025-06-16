import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

type Ocorrencia = {
  id: number;
  titulo: string;
  descricao: string;
};

export function useOcorrencias() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchOcorrencias = async () => {
    try {
      setLoading(true);
      setErro(null);

      const token = await obterToken();
      if (!token) throw new Error('Token não encontrado');

      console.log("API_URL:", API_URL);

      const response = await fetch(`${API_URL}/api/ocorrencias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar ocorrências');
      }

      setOcorrencias(data);
    } catch (err: any) {
      console.error("Erro ao buscar ocorrências:", err);
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOcorrencias();
  }, []);

  return { ocorrencias, loading, erro, refetch: fetchOcorrencias };
}
