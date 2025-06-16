import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from '@/utils/toast';

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarVisitante() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const salvarVisitante = async () => {
    if (!titulo.trim() || !descricao.trim()) {
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

      const response = await fetch(`${API_URL}/api/visitantes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descricao, status: "aberto" }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.error || data.message || "Erro ao criar ocorrência");
        setTitulo("");
        setDescricao("");
        setLoading(false);
        return;
      }

      showToast("success", "Ocorrência criada com sucesso!");
      router.push("/visitantes");
    } catch (error) {
      console.error("Erro no salvarVisitante:", error);
      showToast("error", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return {
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    salvarVisitante,
    loading,
  };
}
