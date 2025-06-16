import { useState } from "react";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useAlterarStatusVisitante(id: string, statusInicial: string) {
  const [status, setStatus] = useState(statusInicial || "pendente");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const alterarStatus = async () => {
    setLoading(true);

    try {
      const token = await obterToken();

      if (!token) {
        showToast("error", "Usuário não autenticado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/visitantes/${id}/status`, {
        method: "PATCH", // PATCH é mais apropriado para alteração parcial
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Erro ao atualizar status do visitante.");
        setLoading(false);
        return;
      }

      showToast("success", "Status do visitante atualizado com sucesso!");
      router.push("/visitantesAdmin");
    } catch (error) {
      console.error("Erro ao alterar status do visitante:", error);
      showToast("error", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    setStatus,
    loading,
    alterarStatus,
  };
}
