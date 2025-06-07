import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarOcorrencia() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const salvarOcorrencia = async () => {
    if (!titulo.trim() || !descricao.trim()) {
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

      const response = await fetch(`${API_URL}/api/ocorrencias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descricao, status: "aberto" }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || data.message || "Erro ao criar ocorrência");
        setTitulo("");
        setDescricao("");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Ocorrência criada com sucesso!");
      router.push("/ocorrencias");
    } catch (error) {
      console.error("Erro no salvarOcorrencia:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return {
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    salvarOcorrencia,
    loading,
  };
}
