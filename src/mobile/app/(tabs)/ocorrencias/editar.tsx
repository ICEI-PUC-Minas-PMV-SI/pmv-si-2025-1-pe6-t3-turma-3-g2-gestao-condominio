import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useEditarOcorrencia } from "@/hooks/useEditarOcorrencia";

export default function EditarOcorrenciaScreen() {
  const router = useRouter();
  const { id, titulo: tituloExistente, descricao: descricaoExistente } = useLocalSearchParams();

  const {
    novoTitulo,
    setNovoTitulo,
    novaDescricao,
    setNovaDescricao,
    atualizarOcorrencia,
    loading,
  } = useEditarOcorrencia(id as string);

  useEffect(() => {
    if (tituloExistente) {
      setNovoTitulo(Array.isArray(tituloExistente) ? tituloExistente[0] : tituloExistente);
    }
    if (descricaoExistente) {
      setNovaDescricao(Array.isArray(descricaoExistente) ? descricaoExistente[0] : descricaoExistente);
    }
  }, [tituloExistente, descricaoExistente]);

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
        onPress={atualizarOcorrencia}
        disabled={loading}
        style={{
          backgroundColor: "#002C21",
          paddingVertical: 12,
          borderRadius: 10,
          alignSelf: "center",
          width: "50%",
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold", textAlign: "center" }}>
          {loading ? "SALVANDO..." : "SALVAR"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
