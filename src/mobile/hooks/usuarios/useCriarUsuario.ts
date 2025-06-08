import { useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const criarUsuario = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nome, email, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Erro ao cadastrar usuário.");
      } else {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Alert.alert("Erro", "Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    criarUsuario,
    loading,
  };
}
