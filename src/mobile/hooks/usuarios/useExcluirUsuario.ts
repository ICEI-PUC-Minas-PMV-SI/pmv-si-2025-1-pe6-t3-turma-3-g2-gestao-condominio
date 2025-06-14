import { useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useExcluirUsuario(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const excluir = async (id: string) => {
  console.log("Iniciando exclusão do usuário com ID:", id);

  try {
    setLoading(true);
    const token = await obterToken();

    if (!token) {
      console.error("Token de autenticação não encontrado.");
      Alert.alert("Erro", "Usuário não autenticado.");
      setLoading(false);
      return;
    }

    const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("Resposta da API:", data);

    if (!response.ok) {
      console.error("Erro ao excluir usuário:", data.message);
      Alert.alert("Erro", data.message || "Erro ao excluir usuário.");
    } else {
      console.log("Usuário excluído com sucesso! ID:", id);
      Alert.alert("Sucesso", "Usuário excluído com sucesso!");
      if (onSuccess) onSuccess();
    }
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error);
    Alert.alert("Erro", "Erro na comunicação com o servidor.");
  } finally {
    setLoading(false);
    console.log("Processo de exclusão finalizado.");
  }
};


  return { excluir, loading };
}
