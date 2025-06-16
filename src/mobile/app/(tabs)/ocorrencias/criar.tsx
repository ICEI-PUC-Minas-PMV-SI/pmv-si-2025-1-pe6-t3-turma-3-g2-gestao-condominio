import React from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useCriarOcorrencia } from "@/hooks/ocorrencias/useCriarOcorrencia";

export default function CriarOcorrenciaScreen() {
  const router = useRouter();

  const {
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    salvarOcorrencia,
    loading,
  } = useCriarOcorrencia();

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
        onPress={() => router.back()}
      >
        ← Voltar
      </Text>
      <Text style={styles.title}>Criar Ocorrência</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputDescricao]}
          placeholder="Descrição"
          placeholderTextColor="#888"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={salvarOcorrencia}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Salvando..." : "Salvar"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDEB",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002C21",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  inputGroup: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 40,
  },
  label: {
    color: "#002C21",
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#002C21",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFDEB",
  },
  inputDescricao: {
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#002C21",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});