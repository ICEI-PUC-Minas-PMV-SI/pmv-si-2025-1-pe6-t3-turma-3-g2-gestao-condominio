import { useState } from "react";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarVisitante() {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [dataVisita, setDataVisita] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const salvarVisitante = async () => {
    if (!nome || !documento || !apartamento || !dataVisita) {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          documento,
          apartamento,
          dataVisita: new Date(dataVisita).toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Erro ao criar visitante");
        setLoading(false);
        return;
      }

      showToast("success", "Visitante criado com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao criar visitante:", error);
      showToast("error", "Erro ao criar visitante");
    } finally {
      setLoading(false);
    }
  };

  return {
    nome, setNome,
    documento, setDocumento,
    apartamento, setApartamento,
    dataVisita, setDataVisita,
    salvarVisitante, loading,
  };
}