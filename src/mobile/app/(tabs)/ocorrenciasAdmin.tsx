import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import ListaDeItens from "@/components/ListaDeItens";
import { useOcorrenciasAdmin } from '@/hooks/useOcorrenciasAdmin';
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

export default function OcorrenciasAdminScreen() {
  const router = useRouter();

  const { ocorrencias, loading, erro, refetch } = useOcorrenciasAdmin();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listagem das ocorrências (Admin)</Text>

      <ListaDeItens
        dados={ocorrencias}
        renderItem={(ocorrencia) => (
          <View style={styles.card} key={ocorrencia.id}>
            <Link
              href={{
                pathname: `/ocorrencias/detalhesadmin`,
                params: { id: ocorrencia.id },
              }}
              asChild
            >
              <TouchableOpacity>
                <View>
                  <Text style={styles.tituloOcorrencia}>{ocorrencia.titulo}</Text>
                  <Text style={styles.emailUsuario}>
                    <Text style={{ fontWeight: "bold" }}>Usuário:</Text> {ocorrencia.User?.email ?? 'Usuário desconhecido'}
                  </Text>
                  <Text
                    style={styles.descricao}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    <Text style={{ fontWeight: "bold" }}>Descrição:</Text> {ocorrencia.descricao}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <View style={styles.rodapeCard}>
              <Text style={styles.status}>
                <Text style={{ fontWeight: "bold" }}>Status:</Text> {ocorrencia.status}
              </Text>
              <View style={styles.icones}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/ocorrencias/editaradmin",
                      params: {
                        id: ocorrencia.id,
                        status: ocorrencia.status,
                        titulo: ocorrencia.titulo,
                      },
                    })
                  }
                >
                  <Feather name="edit-3" size={20} color="#002C21" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDEB",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002C21",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#002C21",
    borderRadius: 10,
    backgroundColor: "#FFFDEB",
    padding: 16,
    width: "90%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 16,
  },
  tituloOcorrencia: {
    color: "#002C21",
    fontWeight: "bold",
    marginBottom: 4,
  },
  emailUsuario: {
    color: "#004422",
    marginBottom: 4,
    fontStyle: "italic",
  },
  descricao: {
    color: "#002C21",
    marginBottom: 4,
  },
  icones: {
    marginLeft: 10,
  },
  rodapeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  status: {
    color: "#002C21",
  },
});
