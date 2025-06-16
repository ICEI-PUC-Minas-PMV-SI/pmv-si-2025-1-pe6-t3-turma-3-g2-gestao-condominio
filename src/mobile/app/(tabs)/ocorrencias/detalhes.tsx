import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, ActivityIndicator, View } from "react-native";
import { useOcorrenciaDetalhes } from "@/hooks/ocorrencias/useOcorrenciaDetalhes";

export default function DetalhesOcorrenciaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { ocorrencia, loading, erro } = useOcorrenciaDetalhes(id as string);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDEB", paddingHorizontal: 16, paddingTop: 40 }}>
      <Text style={{ color: "#002C21", fontSize: 16, marginBottom: 20 }} onPress={() => router.back()}>
        ← Voltar
      </Text>

      {loading ? (
        <ActivityIndicator color="#002C21" size="large" />
      ) : erro ? (
        <Text style={{ color: "red", textAlign: "center" }}>{erro}</Text>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#002C21",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {ocorrencia.titulo}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#002C21",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            {ocorrencia.descricao}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
