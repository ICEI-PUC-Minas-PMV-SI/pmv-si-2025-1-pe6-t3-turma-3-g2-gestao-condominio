import { useState } from "react";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";
import { showToast } from "@/utils/toast";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useEditarUsuario(id: string) {
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editarUsuario = async () => {
  if (!novoNome.trim() || !novoEmail.trim()) {
    showToast("error", "Nome e email são obrigatórios!");
    return;
  }

  console.log("Iniciando edição do usuário:", {
    id,
    nome: novoNome,
    email: novoEmail,
    senha: novaSenha ? "[senha informada]" : "[sem alteração de senha]",
  });

  setLoading(true);

  try {
    const token = await obterToken();

    if (!token) {
      console.error("Token de autenticação não encontrado.");
      showToast("error", "Usuário não autenticado. Faça login novamente.");
      setLoading(false);
      return;
    }

    const body = {
      name: novoNome,
      email: novoEmail,
      ...(novaSenha ? { password: novaSenha } : {}),
    };

    console.log("Enviando dados para API:", body);

    const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Resposta da API:", data);

    if (!response.ok) {
      console.error("Erro ao atualizar usuário:", data.message);
      showToast("error", data.message || "Erro ao atualizar usuário.");
      setLoading(false);
      return;
    }

    showToast("success", "Usuário atualizado com sucesso!");
    console.log("Usuário atualizado com sucesso! Redirecionando...");
    router.push("/usuarios");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    showToast("error", "Não foi possível conectar ao servidor.");
  } finally {
    setLoading(false);
    console.log("Processo de edição finalizado.");
  }
};


  return {
    novoNome,
    setNovoNome,
    novoEmail,
    setNovoEmail,
    novaSenha,
    setNovaSenha,
    editarUsuario,
    loading,
  };
}
