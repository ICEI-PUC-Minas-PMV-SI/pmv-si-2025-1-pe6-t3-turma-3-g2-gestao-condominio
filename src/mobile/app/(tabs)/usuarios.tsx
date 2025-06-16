import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

import ListaDeItens from "@/components/ListaDeItens";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import { useExcluirUsuario } from "@/hooks/usuarios/useExcluirUsuario";

export default function UsuariosScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const router = useRouter();

  const { usuarios, loading, erro, refetch } = useUsuarios();
  const { excluir, loading: excluindo } = useExcluirUsuario(() => {
    fecharModal();
    refetch();
  });

  const abrirModal = (usuario) => {
    setUsuarioSelecionado(usuario);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setUsuarioSelecionado(null);
  };

  const excluirUsuario = () => {
    if (!usuarioSelecionado?.id) return;
    excluir(usuarioSelecionado.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
        onPress={() => router.push("/menu")} // navega para menu.tsx
      >
        ← Voltar
      </Text>
      <Text style={styles.titulo}>Listagem de Usuários</Text>

      <Link href="/usuarios/criarUsuario" asChild>
        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.textoBotao}>CRIAR USUÁRIO</Text>
        </TouchableOpacity>
      </Link>

      {/* Botão de Refresh */}
      <TouchableOpacity
        onPress={refetch}
        style={{
          backgroundColor: "#E0E0E0",
          padding: 10,
          borderRadius: 8,
          alignSelf: "center",
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Feather name="refresh-cw" size={16} color="#002C21" />
        <Text style={{ color: "#002C21", fontWeight: "bold" }}>
          Atualizar Lista
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#002C21" style={{ marginTop: 50 }} />
      ) : erro ? (
        <Text style={styles.erroTexto}>{erro}</Text>
      ) : (
        <ListaDeItens
          dados={usuarios}
          renderItem={(usuario) => (
            <View style={styles.card} key={usuario.id}>
              <Link
                href={{
                  pathname: `/usuarios/editarUsuario`,
                  params: {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                  },
                }}
                asChild
              >
                <TouchableOpacity>
                  <Text style={styles.idUsuario}>ID: {usuario.id}</Text>
                  <Text style={styles.nameUsuario}>{usuario.name}</Text>
                  <Text style={styles.emailUsuario}>{usuario.email}</Text>
                </TouchableOpacity>
              </Link>

              <View style={styles.rodapeCard}>
                <View style={styles.icones}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/usuarios/editarUsuario",
                        params: {
                          id: usuario.id,
                          name: usuario.name,
                          email: usuario.email,
                        },
                      })
                    }
                  >
                    <Feather name="edit-3" size={16} color="#002C21" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => abrirModal(usuario)}>
                    <Feather name="trash" size={16} color="#002C21" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={fecharModal}>
              <Feather name="x" size={24} color="#002C21" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalDescription}>
              Você tem certeza que deseja excluir o usuário{" "}
              <Text style={{ fontWeight: "bold" }}>
                {usuarioSelecionado?.nome}
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
                onPress={excluirUsuario}
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
    marginBottom: 16,
    alignSelf: "center",
  },
  nameUsuario: {
    color: "#002C21",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  emailUsuario: {
    color: "#002C21",
    fontStyle: "italic",
  },
  idUsuario: {
    color: "#002C21",
    fontSize: 12,
    marginBottom: 4,
  },
  rodapeCard: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 50,
  },
  erroTexto: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
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
