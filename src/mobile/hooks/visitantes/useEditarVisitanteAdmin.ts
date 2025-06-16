import { useMutation } from 'react-query';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

interface VisitanteData {
  nome: string;
  documento: string;
  apartamento: string;
  dataVisita: string;
}

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === '') ? 'http://localhost:3000' : rawUrl;

export function useEditarVisitanteAdmin() {
  const mutation = useMutation(async ({ id, dados }: { id: string; dados: VisitanteData }) => {
    const token = await obterToken();

    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_URL}/api/visitantes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Erro ao editar visitante');
    }

    return responseData;
  });

  return mutation;
}
