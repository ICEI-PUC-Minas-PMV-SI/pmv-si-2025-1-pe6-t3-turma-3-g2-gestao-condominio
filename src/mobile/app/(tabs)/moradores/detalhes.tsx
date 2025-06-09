import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, ActivityIndicator, View } from "react-native";
import { useMoradorDetalhes } from "@/hooks/useMoradorDetalhes";

export default function DetalhesMoradorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { morador, loading, erro } = useMoradorDetalhes(id as string);

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
            {morador.nome}
          </Text>

          <Text style={{ fontSize: 16, color: "#002C21", textAlign: "center", marginBottom: 10 }}>
            Apartamento: {morador.apartamento}
          </Text>

          <Text style={{ fontSize: 16, color: "#002C21", textAlign: "center", marginBottom: 10 }}>
            Bloco: {morador.bloco}
          </Text>

          <Text style={{ fontSize: 16, color: "#002C21", textAlign: "center" }}>
            Contato: {morador.contato}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}