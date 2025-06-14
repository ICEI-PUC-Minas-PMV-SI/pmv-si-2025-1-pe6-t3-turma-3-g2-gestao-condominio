import { useMutation } from 'react-query';

interface VisitanteData {
  nome: string;
  documento: string;
  apartamento: string;
  dataVisita: string;
}

export function useEditarVisitanteAdmin() {
  const mutation = useMutation(async ({ id, dados }: { id: string; dados: VisitanteData }) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/api/visitantes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao editar visitante');
    }

    return response.json();
  });

  return mutation;
}
