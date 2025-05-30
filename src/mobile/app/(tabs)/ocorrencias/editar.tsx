import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditarOcorrenciaScreen() {
  const router = useRouter();
  const { titulo: tituloExistente, descricao: descricaoExistente } = useLocalSearchParams();

  const titulo = Array.isArray(tituloExistente) ? tituloExistente[0] : tituloExistente || "";
  const descricao = Array.isArray(descricaoExistente) ? descricaoExistente[0] : descricaoExistente || "";

  const [novoTitulo, setNovoTitulo] = useState(titulo);
  const [novaDescricao, setNovaDescricao] = useState(descricao);

  const salvarAlteracoes = () => {
    if (!novoTitulo || !novaDescricao) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    Alert.alert("Sucesso", "Ocorrência editada com sucesso!");
    router.push("/ocorrencias");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFDEB",
        paddingHorizontal: 16,
        paddingTop: 40,
      }}
    >
      {/* Botão Voltar */}
      <Text
        style={{
          color: "#002C21",
          fontSize: 16,
          marginBottom: 20,
        }}
        onPress={() => router.back()}
      >
        ← Voltar
      </Text>

      {/* Título da Tela */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#002C21",
          textAlign: "center",
          marginTop: 40,
          marginBottom: 50,
        }}
      >
        Editar Ocorrência
      </Text>

      {/* Input de Título */}
      <Text style={{ color: "#002C21", fontWeight: "bold", marginBottom: 8 }}>Título:</Text>
      <TextInput
        placeholder="Título"
        placeholderTextColor="#888"
        value={novoTitulo}
        onChangeText={setNovoTitulo}
        style={{
          borderWidth: 1,
          borderColor: "#002C21",
          borderRadius: 10,
          padding: 10,
          marginBottom: 40,
          backgroundColor: "#FFFDEB",
        }}
      />

      {/* Input de Descrição */}
      <Text style={{ color: "#002C21", fontWeight: "bold", marginBottom: 8 }}>Descrição:</Text>
      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#888"
        value={novaDescricao}
        onChangeText={setNovaDescricao}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#002C21",
          borderRadius: 10,
          padding: 10,
          height: 100,
          backgroundColor: "#FFFDEB",
          textAlignVertical: "top",
          marginBottom: 60,
        }}
      />

      {/* Botão de Salvar */}
      <TouchableOpacity
        onPress={salvarAlteracoes}
        style={{
          backgroundColor: "#002C21",
          paddingVertical: 12,
          borderRadius: 10,
          alignSelf: "center",
          width: "50%",
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold", textAlign: "center" }}>SALVAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}