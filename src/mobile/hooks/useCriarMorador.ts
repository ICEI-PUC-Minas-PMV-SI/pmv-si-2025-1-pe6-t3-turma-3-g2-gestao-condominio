import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarMorador() {
  const [nome, setNome] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [bloco, setBloco] = useState("");
  const [contato, setContato] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const salvarMorador = async () => {
    if (!nome.trim() || !apartamento.trim() || !bloco.trim() || !contato.trim()) {
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

      const response = await fetch(`${API_URL}/api/moradores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          apartamento,
          bloco,
          contato,
        }),
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", dataResponse.error || "Erro ao criar morador.");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Morador criado com sucesso!");
      router.push("/moradores");
    } catch (error) {
      console.error("Erro ao salvar morador:", error);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nome,
    setNome,
    apartamento,
    setApartamento,
    bloco,
    setBloco,
    contato,
    setContato,
    salvarMorador,
    loading,
  };
}