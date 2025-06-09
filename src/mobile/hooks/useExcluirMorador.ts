import { useState } from 'react';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { obterToken } from '@/utils/auth';

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useExcluirMorador(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const excluir = async (id: string) => {
    try {
      setLoading(true);
      const token = await obterToken();

      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/moradores/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Erro ao excluir morador.");
      } else {
        Alert.alert("Sucesso", "Morador excluído com sucesso!");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Erro ao excluir morador:", error);
      Alert.alert("Erro", "Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return { excluir, loading };
}