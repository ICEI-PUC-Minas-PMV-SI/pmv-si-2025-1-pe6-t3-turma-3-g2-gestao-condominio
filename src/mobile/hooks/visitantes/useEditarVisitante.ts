import { useState } from "react";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useEditarVisitante(id: string) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [dataVisita, setDataVisita] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const atualizarVisitante = async () => {
    if (!nome || !documento || !apartamento || !dataVisita) {
      showToast("error", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const token = await obterToken();

      if (!token) {
        showToast("error", "Usuário não autenticado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/visitantes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          documento,
          apartamento,
          dataVisita: new Date(dataVisita).toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Erro ao atualizar visitante.");
        setLoading(false);
        return;
      }

      showToast("success", "Visitante atualizado com sucesso!");
      router.push("/visitantes");
    } catch (error) {
      console.error("Erro ao atualizar visitante:", error);
      showToast("error", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nome,
    setNome,
    documento,
    setDocumento,
    apartamento,
    setApartamento,
    dataVisita,
    setDataVisita,
    atualizarVisitante,
    loading,
  };
}
