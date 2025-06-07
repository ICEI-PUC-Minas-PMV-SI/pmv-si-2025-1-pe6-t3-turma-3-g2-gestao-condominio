import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, ActivityIndicator, View } from "react-native";
import { useReservaDetalhes } from "@/hooks/useReservaDetalhes";

export default function DetalhesReservaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { reserva, loading, erro } = useReservaDetalhes(id as string);

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
            {reserva.nome}
          </Text>

          <Text style={{ fontSize: 16, color: "#002C21", textAlign: "center", marginBottom: 10 }}>
            Data: {reserva.data}
          </Text>

          <Text style={{ fontSize: 16, color: "#002C21", textAlign: "center", marginBottom: 10 }}>
            Horário: {reserva.horario}
          </Text>

          <Text style={{ fontSize: 16, color: "#002C21", textAlign: "center" }}>
            Status: {reserva.status}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
