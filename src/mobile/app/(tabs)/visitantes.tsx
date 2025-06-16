
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import ListaDeItens from "@/components/ListaDeItens";
import { useVisitantes } from "@/hooks/visitantes/useVisitantes";
import { useFocusEffect } from "@react-navigation/native";
import { useExcluirVisitante } from "@/hooks/visitantes/useExcluirVisitante";

export default function VisitantesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [visitanteSelecionado, setVisitanteSelecionado] = useState(null);
  const router = useRouter();
  const { visitantes, loading, error, refetch } = useVisitantes();
  const { excluir, loading: excluindo } = useExcluirVisitante(() => {
    fecharModal();
    refetch();
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const abrirModal = (visitante) => {
    setVisitanteSelecionado(visitante);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setVisitanteSelecionado(null);
  };

  const excluirVisitante = () => {
    if (!visitanteSelecionado?.id) return;
    excluir(visitanteSelecionado.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
        onPress={() => router.replace('/menu')}
      >
        ← Voltar
      </Text>
      <Text style={styles.titulo}>Listagem de Visitantes</Text>

      <Link href="/visitantes/criar" asChild>
        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.textoBotao}>NOVO VISITANTE</Text>
        </TouchableOpacity>
      </Link>

      <ListaDeItens
        dados={visitantes}
        renderItem={(visitante) => (
          <View style={styles.card}>
            <Link
              href={{
                pathname: "/visitantes/detalhes",
                params: { id: visitante.id },
              }}
              asChild
            >
              <TouchableOpacity>
                <View>
                  <Text style={styles.tituloOcorrencia}>{visitante.nome}</Text>
                  <Text style={styles.descricao}>
                    <Text style={{ fontWeight: "bold" }}>Apartamento:</Text> {visitante.apartamento}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <View style={styles.rodapeCard}>
              <Text style={styles.status}>Documento: {visitante.documento}</Text>

              <View style={styles.icones}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/visitantes/editar",
                      params: {
                        id: visitante.id,
                        nome: visitante.nome,
                        documento: visitante.documento,
                        apartamento: visitante.apartamento,
                        dataVisita: visitante.dataVisita,
                      },
                    })
                  }
                >
                  <Feather name="edit-3" size={16} color="#002C21" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => abrirModal(visitante)}>
                  <Feather name="trash" size={16} color="#002C21" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={fecharModal}
            >
              <Feather name="x" size={24} color="#002C21" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalDescription}>
              Você tem certeza que deseja excluir o visitante{" "}
              <Text style={{ fontWeight: "bold" }}>
                {visitanteSelecionado?.nome}
              </Text>
              ?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={fecharModal}
              >
                <Text style={{ color: "#002C21", fontWeight: "bold" }}>
                  CANCELAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  excluindo && { opacity: 0.6 },
                ]}
                onPress={excluirVisitante}
                disabled={excluindo}
              >
                <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                  {excluindo ? "EXCLUINDO..." : "CONFIRMAR"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  botaoCriar: {
    backgroundColor: "#002C21",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
    width: "60%",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
    marginBottom: 16
  },
  tituloOcorrencia: {
    color: "#002C21",
    fontWeight: "bold",
    marginBottom: 4,
  },
  descricao: {
    color: "#002C21",
    marginBottom: 4,
  },
  rodapeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    color: "#002C21",
    marginTop: 0
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 50,
  },
  modalCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFFDEB",
    borderWidth: 2,
    borderColor: "#002C21",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002C21",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#002C21",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#002C21",
  },
  confirmButton: {
    backgroundColor: "#002C21",
  },
});
