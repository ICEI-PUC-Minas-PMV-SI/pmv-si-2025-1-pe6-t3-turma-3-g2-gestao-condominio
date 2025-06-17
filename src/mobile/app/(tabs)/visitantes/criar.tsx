import React from "react";
import { Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCriarVisitante } from "@/hooks/visitantes/useCriarVisitante";

export default function CriarVisitanteScreen() {
  const {
    nome, setNome,
    documento, setDocumento,
    apartamento, setApartamento,
    dataVisita, setDataVisita,
    salvarVisitante
  } = useCriarVisitante();

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (!dataVisita.includes("/")) {
        Alert.alert("Erro", "A data precisa estar no formato DD/MM/AAAA");
        return;
      }

      const [dia, mes, ano] = dataVisita.split("/");
      const dataFormatada = `${ano}-${mes}-${dia}T00:00:00.000Z`;

      await salvarVisitante({
        nome,
        documento,
        apartamento,
        dataVisita: dataFormatada,
      });

    } catch (error) {
      console.error("Erro ao salvar visitante:", error);
      Alert.alert("Erro", "Não foi possível criar o visitante");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.voltar} onPress={() => router.replace('/menu')}>
        ← Voltar
      </Text>
      <Text style={styles.titulo}>Novo Visitante</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Documento"
        placeholderTextColor="#666"
        value={documento}
        onChangeText={setDocumento}
      />
      <TextInput
        style={styles.input}
        placeholder="Apartamento"
        placeholderTextColor="#666"
        value={apartamento}
        onChangeText={setApartamento}
      />
      <TextInput
        style={styles.input}
        placeholder="Data da visita (DD/MM/AAAA)"
        placeholderTextColor="#666"
        value={dataVisita}
        onChangeText={setDataVisita}
      />

      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.textoBotao}>CADASTRAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDEB",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  voltar: {
    color: "#002C21",
    fontSize: 16,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002C21",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#002C21",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  botao: {
    backgroundColor: "#002C21",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
