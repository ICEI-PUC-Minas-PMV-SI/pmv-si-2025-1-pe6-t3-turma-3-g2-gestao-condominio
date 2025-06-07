import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useOcorrenciaDetalhesAdmin } from "@/hooks/ocorrencias/useOcorrenciaDetalhesAdmin";

export default function DetalhesAdminScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { ocorrencia, loading, erro } = useOcorrenciaDetalhesAdmin(id);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (erro) return <Text style={styles.error}>{erro}</Text>;
  if (!ocorrencia) return <Text style={styles.error}>Ocorrência não encontrada.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Voltar alinhado à esquerda */}
      <Text
        style={styles.voltar}
        onPress={() => router.push("/ocorrenciasAdmin")}
      >
        ← Voltar
      </Text>

      {/* Container centralizado para título e detalhes */}
      <View style={styles.centeredContent}>
        <Text style={styles.title}>{ocorrencia.titulo}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Usuário:</Text>
          <Text style={styles.value}>{ocorrencia.User?.name ?? "Desconhecido"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{ocorrencia.User?.email ?? "Desconhecido"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.value}>{ocorrencia.descricao}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{ocorrencia.status}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFDEB",
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    margin: 16,
    color: "red",
    textAlign: "center",
  },
  voltar: {
    color: "#002C21",
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "flex-start", // mantém o voltar à esquerda
  },
  centeredContent: {
    alignItems: "center",  // centraliza horizontalmente os filhos
    width: "80%",          // limitar largura para ajudar na centralização
    alignSelf: "center",   // centraliza o container dentro do ScrollView
    marginTop: 20,        // adiciona um espaço entre "Voltar" e os detalhes
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#002C21",
    marginBottom: 24,
    textAlign: "center",
  },
  detailRow: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#004422",
    marginBottom: 4,
    textAlign: "center",
  },
  value: {
    fontSize: 16,
    color: "#002C21",
    textAlign: "center",
  },
});