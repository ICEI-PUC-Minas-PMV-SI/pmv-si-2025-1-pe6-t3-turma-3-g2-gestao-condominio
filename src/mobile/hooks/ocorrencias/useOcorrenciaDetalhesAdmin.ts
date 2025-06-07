import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useOcorrenciaDetalhesAdmin(id: string) {
  const [ocorrencia, setOcorrencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchOcorrenciaAdmin = async () => {
      try {
        setLoading(true);
        const token = await obterToken();

        if (!token) {
          Alert.alert("Erro", "Usuário não autenticado.");
          setErro("Sem token");
          return;
        }

       const response = await fetch(`${API_URL}/api/listar/ocorrencias/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          Alert.alert("Erro", data.message || "Erro ao carregar ocorrência (admin).");
          setErro(data.message);
          return;
        }

        setOcorrencia(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes (admin):", err);
        Alert.alert("Erro", "Erro na comunicação com o servidor.");
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOcorrenciaAdmin();
  }, [id]);

  return { ocorrencia, loading, erro };
}
