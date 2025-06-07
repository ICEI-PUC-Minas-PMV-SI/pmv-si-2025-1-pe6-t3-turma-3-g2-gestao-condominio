import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode';

type Reserva = {
  id: number;
  nome: string;
  data: string;
  status: string;
};

type DecodedToken = {
  id: number;
  // coloque outros campos que precisar aqui
};

export function useReservas() {
  const rawUrl = Constants.expoConfig?.extra?.API_URL;
  const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      setErro(null);

      const token = await obterToken();
      if (!token) throw new Error('Token não encontrado');

      // Decodifica o token para verificar se é admin
      const decoded = jwtDecode<DecodedToken>(token);
      const isAdmin = decoded?.id === 1; // Ajuste a lógica conforme seu critério de admin

      const url = isAdmin ? '/reservas' : '/listar/reservas';

      const response = await fetch(`${API_URL}/api${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar reservas');
      }

      setReservas(data);
    } catch (err: any) {
      console.error('Erro ao buscar reservas:', err);
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return { reservas, loading, erro, refetch: fetchReservas };
}
