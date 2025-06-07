import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useAlterarStatusOcorrencia(id: string, statusInicial: string) {
  const [status, setStatus] = useState(statusInicial || "Aberto");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const alterarStatus = async () => {
    setLoading(true);

    try {
      const token = await obterToken();

      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/ocorrencias/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Erro ao atualizar status.");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Status atualizado com sucesso!");
      router.push("/ocorrenciasAdmin");
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
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