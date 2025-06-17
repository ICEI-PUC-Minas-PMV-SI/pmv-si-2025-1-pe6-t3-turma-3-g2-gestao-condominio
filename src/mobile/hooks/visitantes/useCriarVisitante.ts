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

  const salvarVisitante = async (dados?: {
    nome?: string;
    documento?: string;
    apartamento?: string;
    dataVisita?: string;
  }) => {
    const nomeFinal = dados?.nome ?? nome;
    const documentoFinal = dados?.documento ?? documento;
    const apartamentoFinal = dados?.apartamento ?? apartamento;
    const dataVisitaFinal = dados?.dataVisita ?? dataVisita;

    if (!nomeFinal || !documentoFinal || !apartamentoFinal || !dataVisitaFinal) {
      showToast("error", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const token = await obterToken();

      if (!token) {
        showToast("error", "Usuário não autenticado. Faça login novamente.");
        return;
      }

      const response = await fetch(`${API_URL}/api/visitantes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nomeFinal,
          documento: documentoFinal,
          apartamento: apartamentoFinal,
          dataVisita: dataVisitaFinal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Erro ao criar visitante");
        return;
      }

      showToast("success", "Visitante criado com sucesso!");
      router.push("/visitantes");
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
