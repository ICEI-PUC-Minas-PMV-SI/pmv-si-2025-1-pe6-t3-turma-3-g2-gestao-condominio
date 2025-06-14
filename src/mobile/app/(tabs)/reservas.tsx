import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import ListaDeItens from "@/components/ListaDeItens";
import { useReservas } from "@/hooks/reservas/useReservas";
import { useFocusEffect } from "@react-navigation/native";
import { useExcluirReserva } from "@/hooks/reservas/useExcluirReserva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

interface Reserva {
  id: string;
  nome: string;
  data: string;
  horario: string;
  status: string;
}

interface DecodedToken {
  id: number;
}

export default function ReservasScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState<Reserva | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const { reservas, loading, erro, refetch } = useReservas();

  const { excluir, loading: loadingExcluir } = useExcluirReserva(() => {
    refetch();
    setModalVisible(false);
    setReservaSelecionada(null);
    Alert.alert("Sucesso", "Reserva excluída com sucesso!");
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    const obterUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode<DecodedToken>(token);
          setUserId(decoded.id);
        }
      } catch (error) {
        console.error("Erro ao obter token:", error);
      }
    };

    obterUserId();
  }, []);

  const abrirModal = (reserva: Reserva) => {
    setReservaSelecionada(reserva);
    setModalVisible(true);
  };

  const excluirReserva = () => {
    if (reservaSelecionada) {
      excluir(reservaSelecionada.id);
    }
  };

  const corStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmada":
        return "#2ecc71";
      case "cancelada":
        return "#e74c3c";
      case "pendente":
        return "#f39c12";
      default:
        return "#002C21";
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text
                            style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
                            onPress={() => router.replace('/menu')}
                          >
                            ← Voltar
      </Text>
      {userId !== null && (
    <Text style={styles.titulo}>
      Listagem das reservas{userId === 1 ? " (Admin)" : ""}
    </Text>
      )}
      {userId !== null && userId !== 1 && (
    <Link href="/reservas/criar" asChild>
      <TouchableOpacity style={styles.botaoCriar}>
        <Text style={styles.textoBotao}>CRIAR RESERVA</Text>
      </TouchableOpacity>
    </Link>
      )}

      <ListaDeItens<Reserva>
        dados={reservas}
        renderItem={(reserva) => (
          <View style={styles.card}>
            <Link
              href={{
                pathname: `/reservas/detalhes`,
                params: {
                  id: reserva.id,
                  nome: reserva.nome,
                  data: reserva.data,
                  horario: reserva.horario,
                },
              }}
              asChild
            >
              <TouchableOpacity>
                <View>
                  <Text style={styles.tituloOcorrencia}>{reserva.nome}</Text>
                  <Text style={styles.descricao}>
                    <Text style={{ fontWeight: "bold" }}>Data:</Text> {reserva.data}
                  </Text>
                  <Text style={styles.descricao}>
                    <Text style={{ fontWeight: "bold" }}>Horário:</Text> {reserva.horario}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <View style={styles.rodapeCard}>
              <Text style={[styles.status, { color: corStatus(reserva.status) }]}>
                <Text style={{ fontWeight: "bold" }}>Status: </Text> {reserva.status}
              </Text>

              <View style={styles.icones}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/reservas/editar",
                      params: {
                        id: reserva.id,
                        nome: reserva.nome,
                        data: reserva.data,
                        horario: reserva.horario,
                      },
                    })
                  }
                >
                  <Feather name="edit-3" size={16} color="#002C21" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => abrirModal(reserva)}>
                  <Feather name="x" size={16} color="#002C21" />
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              disabled={loadingExcluir}
            >
              <Feather name="x" size={24} color="#002C21" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirmar Cancelamento</Text>
            <Text style={styles.modalDescription}>
              Você tem certeza que deseja cancelar a reserva{" "}
              <Text style={{ fontWeight: "bold" }}>
                {reservaSelecionada?.nome}
              </Text>
              ?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                disabled={loadingExcluir}
              >
                <Text style={{ color: "#002C21", fontWeight: "bold" }}>
                  CANCELAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={excluirReserva}
                disabled={loadingExcluir}
              >
                <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                  {loadingExcluir ? "EXCLUINDO..." : "CONFIRMAR"}
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
    paddingTop: 40,
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
    marginBottom: 16,
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
    fontWeight: "bold",
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
