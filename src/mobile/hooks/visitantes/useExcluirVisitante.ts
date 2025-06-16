import { useState } from "react";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useExcluirVisitante(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const excluir = async (id: string) => {
    try {
      setLoading(true);
      const token = await obterToken();

      if (!token) {
        showToast("error", "Usuário não autenticado.");
        return;
      }

      const response = await fetch(`${API_URL}/api/visitantes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Erro ao excluir visitante.");
      } else {
        showToast("success", "Visitante excluído com sucesso!");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Erro ao excluir visitante:", error);
      showToast("error", "Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return { excluir, loading };
}