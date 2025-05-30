
import React, { useState } from "react";
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
import { useOcorrencias } from "@/hooks/useOcorrencias";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function OcorrenciasScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);
  const router = useRouter();
  const { ocorrencias, loading, erro, refetch } = useOcorrencias();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const abrirModal = (ocorrencia) => {
    setOcorrenciaSelecionada(ocorrencia);
    setModalVisible(true);
  };

  const excluirOcorrencia = () => {
    console.log(`Excluindo ocorrência: ${ocorrenciaSelecionada?.titulo}`);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listagem das ocorrências</Text>

      <Link href="/ocorrencias/criar" asChild>
        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.textoBotao}>CRIAR OCORRÊNCIA</Text>
        </TouchableOpacity>
      </Link>

      <ListaDeItens
        dados={ocorrencias}
        renderItem={(ocorrencia) => (
          <View style={styles.card}>
            <Link
              href={{
                pathname: `/ocorrencias/detalhes`,
                params: {
                  titulo: ocorrencia.titulo,
                  descricao: ocorrencia.descricao,
                },
              }}
              asChild
            >
              <TouchableOpacity>
                <View>
                  <Text style={styles.tituloOcorrencia}>{ocorrencia.titulo}</Text>
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
                      pathname: "/ocorrencias/editar",
                      params: {
                        titulo: ocorrencia.titulo,
                        descricao: ocorrencia.descricao,
                      },
                    })
                  }
                >
                  <Feather name="edit-3" size={16} color="#002C21" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => abrirModal(ocorrencia)}>
                  <Feather name="trash" size={16} color="#002C21" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Modal de Exclusão */}
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
            >
              <Feather name="x" size={24} color="#002C21" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalDescription}>
              Você tem certeza que deseja excluir a ocorrência{" "}
              <Text style={{ fontWeight: "bold" }}>
                {ocorrenciaSelecionada?.titulo}
              </Text>
              ?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#002C21", fontWeight: "bold" }}>
                  CANCELAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={excluirOcorrencia}
              >
                <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                  CONFIRMAR
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

