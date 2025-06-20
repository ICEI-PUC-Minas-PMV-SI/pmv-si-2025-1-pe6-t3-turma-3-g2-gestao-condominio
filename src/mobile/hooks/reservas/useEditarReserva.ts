import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from '@/utils/toast';

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useEditarReserva(id: string) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função para converter data de DD/MM/AAAA para YYYY-MM-DD
  const formatarParaAmericano = (dataBr: string) => {
    const [dia, mes, ano] = dataBr.split("/");
    if (!dia || !mes || !ano) return dataBr;
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  };

  const atualizarReserva = async () => {
    if (!nome.trim() || !data.trim() || !horario.trim()) {
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

      const response = await fetch(`${API_URL}/api/reservas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          data: formatarParaAmericano(data), // <-- Aqui a conversão da data
          horario,
          status,
        }),
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", dataResponse.message || "Erro ao atualizar reserva.");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Reserva atualizada com sucesso!");
      showToast("success", "Reserva atualizada com sucesso!");
      router.push("/reservas");
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nome,
    setNome,
    data,
    setData,
    horario,
    setHorario,
    status,
    setStatus,
    atualizarReserva,
    loading,
  };
}
