import { useState } from "react";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from '@/utils/toast';

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
        showToast("error", dataResponse.error || "Erro ao criar morador.");
        setLoading(false);
        return;
      }

      showToast("success", "Morador criado com sucesso!");
      router.push("/moradores");
    } catch (error) {
      console.error("Erro ao salvar morador:", error);
      showToast("error", "Erro de conexão com o servidor.");
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