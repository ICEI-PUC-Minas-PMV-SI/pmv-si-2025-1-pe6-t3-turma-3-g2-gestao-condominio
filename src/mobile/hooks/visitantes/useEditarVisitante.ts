import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from '@/utils/toast';

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useEditarVisitante(id: string) {
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const atualizarVisitante = async () => {
    if (!novoTitulo.trim() || !novaDescricao.trim()) {
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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: novoTitulo,
          descricao: novaDescricao,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Erro ao atualizar ocorrência.");
        setLoading(false);
        return;
      }

      showToast("success", "Ocorrência atualizada com sucesso!");
      router.push("/visitantes");
    } catch (error) {
      console.error("Erro ao atualizar ocorrência:", error);
      showToast("error", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    novoTitulo,
    setNovoTitulo,
    novaDescricao,
    setNovaDescricao,
    atualizarVisitante,
    loading,
  };
}
