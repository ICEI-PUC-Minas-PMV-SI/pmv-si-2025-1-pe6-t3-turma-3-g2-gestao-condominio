import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEditarUsuario } from "@/hooks/usuarios/useEditarUsuario";


export default function EditarUsuarioScreen() {
  const router = useRouter();
  const { id, name, email } = useLocalSearchParams();

  const {
  novoNome,
  setNovoNome,
  novoEmail,
  setNovoEmail,
  novaSenha,
  setNovaSenha,
  editarUsuario,
  loading,
} = useEditarUsuario(String(id));

  useEffect(() => {
    if (name) setNovoNome(String(name));
  if (email) setNovoEmail(String(email));
  if (novaSenha) setNovaSenha(String(novaSenha));
  }, [name, email]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
            onPress={() => router.back()}
          >
            ← Voltar
          </Text>
          <Text style={styles.title}>Editar Usuário</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#888"
              value={novoNome}
              onChangeText={setNovoNome}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={novoEmail}
              onChangeText={setNovoEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha (opcional)"
              placeholderTextColor="#888"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={() => editarUsuario(id)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: "60%",
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
