import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEditarMorador } from "@/hooks/useEditarMorador";

export default function EditarMoradorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    nome, setNome,
    apartamento, setApartamento,
    bloco, setBloco,
    contato, setContato,
    salvarAlteracoes,
    loading,
  } = useEditarMorador(id as string);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDEB", paddingHorizontal: 16, paddingTop: 40 }}>
      <Text style={{ color: "#002C21", fontSize: 16, marginBottom: 20 }} onPress={() => router.back()}>
        ← Voltar
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Morador</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apartamento</Text>
          <TextInput style={styles.input} value={apartamento} onChangeText={setApartamento} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bloco</Text>
          <TextInput style={styles.input} value={bloco} onChangeText={setBloco} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contato</Text>
          <TextInput style={styles.input} value={contato} onChangeText={setContato} />
        </View>

        <TouchableOpacity style={styles.button} onPress={salvarAlteracoes} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFDEB",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#FFFDEB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002C21",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  inputGroup: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 40,
  },
  label: {
    color: "#002C21",
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#002C21",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFDEB",
  },
  button: {
    backgroundColor: "#002C21",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "center",
    width: "50%",
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});