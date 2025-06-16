import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  // Adicione outros campos que seu usuário tem
};

export function useUsuarios() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setErro(null);

      const token = await obterToken();
      if (!token) throw new Error('Token não encontrado');

      const response = await fetch(`${API_URL}/api/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar usuários');
      }

      setUsuarios(data);
    } catch (err: any) {
      console.error("Erro ao buscar usuários:", err);
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, loading, erro, refetch: fetchUsuarios };
}
