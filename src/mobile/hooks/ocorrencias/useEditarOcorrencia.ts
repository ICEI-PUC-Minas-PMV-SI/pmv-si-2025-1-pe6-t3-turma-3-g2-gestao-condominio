import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useEditarOcorrencia(id: string) {
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const atualizarOcorrencia = async () => {
    if (!novoTitulo.trim() || !novaDescricao.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const token = await obterToken();

      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/ocorrencias/${id}`, {
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
        Alert.alert("Erro", data.message || "Erro ao atualizar ocorrência.");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Ocorrência atualizada com sucesso!");
      router.push("/ocorrencias");
    } catch (error) {
      console.error("Erro ao atualizar ocorrência:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    novoTitulo,
    setNovoTitulo,
    novaDescricao,
    setNovaDescricao,
    atualizarOcorrencia,
    loading,
  };
}
