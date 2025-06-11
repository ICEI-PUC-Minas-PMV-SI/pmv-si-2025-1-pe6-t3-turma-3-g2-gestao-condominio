import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from '@/utils/toast';

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useOcorrenciaDetalhes(id: string) {
  const [ocorrencia, setOcorrencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchOcorrencia = async () => {
      try {
        setLoading(true);
        const token = await obterToken();

        if (!token) {
          showToast("error", "Usuário não autenticado.");
          setErro("Sem token");
          return;
        }

        const response = await fetch(`${API_URL}/api/ocorrencias/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          showToast("error", data.message || "Erro ao carregar ocorrência.");
          setErro(data.message);
          return;
        }

        setOcorrencia(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
        showToast("error", "Erro na comunicação com o servidor.");
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOcorrencia();
  }, [id]);

  return { ocorrencia, loading, erro };
}
