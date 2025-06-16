import { useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useCriarUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const criarUsuario = async () => {
  setLoading(true);

  console.log("Iniciando criação de usuário...");
  console.log("Dados enviados:");
  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("Senha:", senha); // Cuidado: em produção, evite logar senhas!

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nome, email, password: senha }),
    });

    const data = await response.json();

    console.log("Resposta da API:", data);

    if (!response.ok) {
      console.error("Erro ao cadastrar usuário:", data.message);
      Alert.alert("Erro", data.message || "Erro ao cadastrar usuário.");
    } else {
      console.log("Usuário criado com sucesso!");
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
    }
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error);
    Alert.alert("Erro", "Erro na comunicação com o servidor.");
  } finally {
    setLoading(false);
    console.log("Processo de criação finalizado.");
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
