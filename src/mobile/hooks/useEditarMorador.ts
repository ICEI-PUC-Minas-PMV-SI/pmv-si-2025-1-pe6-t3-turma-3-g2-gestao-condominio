import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useEditarMorador(id: string) {
  const [nome, setNome] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [bloco, setBloco] = useState("");
  const [contato, setContato] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const carregarMorador = async () => {
      try {
        const token = await obterToken();
        const res = await fetch(`${API_URL}/api/moradores/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao buscar morador");

        setNome(data.nome);
        setApartamento(data.apartamento);
        setBloco(data.bloco);
        setContato(data.contato);
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    };

    carregarMorador();
  }, [id]);

  const salvarAlteracoes = async () => {
    if (!nome.trim() || !apartamento.trim() || !bloco.trim() || !contato.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const token = await obterToken();
      const res = await fetch(`${API_URL}/api/moradores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, apartamento, bloco, contato }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao atualizar morador");

      Alert.alert("Sucesso", "Morador atualizado com sucesso!");
      router.push("/moradores");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao salvar alterações.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nome, setNome,
    apartamento, setApartamento,
    bloco, setBloco,
    contato, setContato,
    salvarAlteracoes,
    loading,
  };
}