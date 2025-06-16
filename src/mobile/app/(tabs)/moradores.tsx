import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import ListaDeItens from "@/components/ListaDeItens";
import { useFocusEffect } from "@react-navigation/native";
import { useMoradores } from "@/hooks/useMoradores";
import { useExcluirMorador } from "@/hooks/useExcluirMorador";
import { obterToken } from "@/utils/auth";
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  id: number;
};

export default function MoradoresScreen() {
  const router = useRouter();
  const { moradores, loading, refetch } = useMoradores();
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  type Morador = {
    id: number;
    nome: string;
    apartamento: string;
    bloco: string;
    contato: string;
    userId: number;
    // Adicione outros campos conforme necessário
  };
  
  const [moradorSelecionado, setMoradorSelecionado] = useState<Morador | null>(null);

  const { excluir, loading: loadingExcluir } = useExcluirMorador(() => {
    refetch();
    setModalVisible(false);
    setMoradorSelecionado(null);
    Alert.alert("Sucesso", "Morador excluído com sucesso!");
  });

  const getUserIdFromToken = async () => {
    try {
      const token = await obterToken();
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.id);
        setIsAdmin(decoded.id === 1);
      }
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
  };

  useEffect(() => {
    getUserIdFromToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const abrirModal = (morador: any) => {
    setMoradorSelecionado(morador);
    setModalVisible(true);
  };

  const excluirMorador = () => {
    if (moradorSelecionado) {
      excluir(moradorSelecionado.id.toString());
    }
  };

  const titulo = isAdmin ? "Lista de Moradores" : "Meu Perfil de Morador";

  const temMoradorCadastrado = !isAdmin && moradores.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{ color: "#002C21", fontSize: 16, marginBottom: 20 }}
        onPress={() => router.back()}
      >
        ← Voltar
      </Text>

      <Text style={styles.titulo}>{titulo}</Text>

      {(isAdmin || (!isAdmin && !temMoradorCadastrado)) && (
        <Link href="/moradores/criar" asChild>
          <TouchableOpacity style={styles.botaoCriar}>
            <Text style={styles.textoBotao}>
              {isAdmin ? "CRIAR MORADOR" : "CRIAR MEU PERFIL"}
            </Text>
          </TouchableOpacity>
        </Link>
      )}

      {!isAdmin && !temMoradorCadastrado && !loading && (
        <View style={styles.mensagemContainer}>
          <Text style={styles.mensagemTexto}>
            Você ainda não possui um perfil de morador cadastrado.
          </Text>
          <Text style={styles.mensagemSubtexto}>
            Clique no botão acima para criar seu perfil.
          </Text>
        </View>
      )}

      <ListaDeItens
        dados={moradores}
        renderItem={(morador) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => router.push(`/moradores/detalhes?id=${morador.id}`)}
            >
              <Text style={styles.nome}>{morador.nome}</Text>
              <Text style={styles.info}>
                <Text style={{ fontWeight: "bold" }}>Apartamento:</Text> {morador.apartamento}
              </Text>
              <Text style={styles.info}>
                <Text style={{ fontWeight: "bold" }}>Bloco:</Text> {morador.bloco}
              </Text>
              <Text style={styles.info}>
                <Text style={{ fontWeight: "bold" }}>Contato:</Text> {morador.contato}
              </Text>
            </TouchableOpacity>

            {(userId === 1 || userId === morador.userId) && (
              <View style={styles.rodapeCard}>
                <View style={styles.icones}>
                  <TouchableOpacity
                    onPress={() => router.push(`/moradores/editar?id=${morador.id}`)}
                    style={{ marginRight: 12 }}
                  >
                    <Feather name="edit-3" size={16} color="#002C21" />
                  </TouchableOpacity>

                  {userId === 1 && (
                    <TouchableOpacity onPress={() => abrirModal(morador)}>
                      <Feather name="x" size={16} color="#002C21" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
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

            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalDescription}>
              Você tem certeza que deseja excluir o morador {" "}
              <Text style={{ fontWeight: "bold" }}>
                {moradorSelecionado?.nome}
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
                onPress={excluirMorador}
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
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002C21",
    marginBottom: 4,
  },
  info: {
    color: "#002C21",
    marginBottom: 4,
  },
  rodapeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  icones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
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
  mensagemContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  mensagemTexto: {
    fontSize: 16,
    color: "#002C21",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },
  mensagemSubtexto: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
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
