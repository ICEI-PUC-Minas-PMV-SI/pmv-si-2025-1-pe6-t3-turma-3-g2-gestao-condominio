import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useVisitanteDetalhes(id: string) {
  const [visitante, setVisitante] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitante = async () => {
      try {
        setLoading(true);
        setErro(null);

        const token = await obterToken();
        if (!token) {
          showToast("error", "Usuário não autenticado.");
          setErro("Token ausente.");
          return;
        }

        const response = await fetch(`${API_URL}/api/visitantes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          showToast("error", data.message || "Erro ao carregar visitante.");
          setErro(data.message);
          return;
        }

        setVisitante(data);
      } catch (err: any) {
        console.error("Erro ao buscar visitante:", err);
        setErro(err.message);
        showToast("error", "Erro na comunicação com o servidor.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVisitante();
  }, [id]);

  return { visitante, loading, erro };
}
