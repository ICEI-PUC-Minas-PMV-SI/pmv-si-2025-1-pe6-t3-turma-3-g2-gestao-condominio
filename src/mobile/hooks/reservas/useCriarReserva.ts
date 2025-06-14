import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarReserva() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔥 Função para converter de DD/MM/AAAA -> YYYY-MM-DD
  const formatarParaAmericano = (dataBr: string) => {
    const [dia, mes, ano] = dataBr.split("/");
    if (!dia || !mes || !ano) return dataBr;
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  };

  const salvarReserva = async () => {
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

      const response = await fetch(`${API_URL}/api/reservas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          data: formatarParaAmericano(data), // 🔥 Conversão da data aqui
          horario,
          status: "Ativo",
        }),
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", dataResponse.error || "Erro ao criar reserva.");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Reserva criada com sucesso!");
      showToast("success", "Reserva criada com sucesso!");
      router.push("/reservas");
    } catch (error) {
      console.error("Erro ao salvar reserva:", error);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
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
    salvarReserva,
    loading,
  };
}
