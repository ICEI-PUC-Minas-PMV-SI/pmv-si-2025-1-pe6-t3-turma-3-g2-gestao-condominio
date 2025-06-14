import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useEditarReserva } from "@/hooks/reservas/useEditarReserva";

export default function EditarReservaScreen() {
  const router = useRouter();
  const { id, nome: nomeExistente, data: dataExistente, horario: horarioExistente } = useLocalSearchParams();

  const {
    nome,
    setNome,
    data,
    setData,
    horario,
    setHorario,
    atualizarReserva,
    loading,
  } = useEditarReserva(id as string);

  useEffect(() => {
    if (nomeExistente) {
      setNome(Array.isArray(nomeExistente) ? nomeExistente[0] : nomeExistente);
    }
    if (dataExistente) {
      setData(Array.isArray(dataExistente) ? dataExistente[0] : dataExistente);
    }
    if (horarioExistente) {
      setHorario(Array.isArray(horarioExistente) ? horarioExistente[0] : horarioExistente);
    }
  }, [nomeExistente, dataExistente, horarioExistente]);

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
        Editar Reserva
      </Text>

      {/* Input Nome */}
      <Text style={{ color: "#002C21", fontWeight: "bold", marginBottom: 8 }}>Nome:</Text>
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          borderColor: "#002C21",
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
          backgroundColor: "#FFFDEB",
        }}
      />

      {/* Input Data */}
      <Text style={{ color: "#002C21", fontWeight: "bold", marginBottom: 8 }}>Data:</Text>
      <TextInput
        placeholder="AAAA-MM-DD"
        placeholderTextColor="#888"
        value={data}
        onChangeText={setData}
        style={{
          borderWidth: 1,
          borderColor: "#002C21",
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
          backgroundColor: "#FFFDEB",
        }}
      />

      {/* Input Horário */}
      <Text style={{ color: "#002C21", fontWeight: "bold", marginBottom: 8 }}>Horário:</Text>
      <TextInput
        placeholder="HH:MM"
        placeholderTextColor="#888"
        value={horario}
        onChangeText={setHorario}
        style={{
          borderWidth: 1,
          borderColor: "#002C21",
          borderRadius: 10,
          padding: 10,
          marginBottom: 60,
          backgroundColor: "#FFFDEB",
        }}
      />

      {/* Botão Salvar */}
      <TouchableOpacity
        onPress={atualizarReserva}
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
