import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from '@/utils/toast';

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useVisitanteDetalhesAdmin(id: string) {
  const [visitante, setVisitante] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitanteAdmin = async () => {
      try {
        setLoading(true);
        setErro(null);

        const token = await obterToken();
        if (!token) {
          showToast("error", "Usuário não autenticado.");
          setErro("Token ausente.");
          return;
        }

        const response = await fetch(`${API_URL}/api/listar/visitantes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          showToast("error", data.message || "Erro ao carregar visitante (admin).");
          setErro(data.message || "Erro desconhecido.");
          return;
        }

        setVisitante(data);
      } catch (err: any) {
        console.error("Erro ao buscar visitante admin:", err);
        showToast("error", "Erro na comunicação com o servidor.");
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVisitanteAdmin();
  }, [id]);

  return { visitante, loading, erro };
}
