import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function DetalhesOcorrenciaScreen() {
  const router = useRouter();
  const { titulo, descricao } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDEB", paddingHorizontal: 16, paddingTop: 40 }}>
      {/* Botão de voltar */}
      <Text
        style={{ color: "#002C21", fontSize: 16, marginBottom: 20 }}
        onPress={() => router.back()}
      >
        ← Voltar
      </Text>

      {/* Detalhes da ocorrência */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#002C21",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {titulo}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#002C21",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        {descricao}
      </Text>
    </SafeAreaView>
  );
}