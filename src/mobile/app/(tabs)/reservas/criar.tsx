import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Menu, Provider } from "react-native-paper";
import { useCriarReserva } from "@/hooks/reservas/useCriarReserva";

export default function CriarReservaScreen() {
  const router = useRouter();

  const {
    nome,
    setNome,
    data,
    setData,
    horario,
    setHorario,
    salvarReserva,
    loading,
  } = useCriarReserva();

  const [menuVisible, setMenuVisible] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState("");

  const abrirMenu = () => setMenuVisible(true);
  const fecharMenu = () => setMenuVisible(false);

  const locais = ["Salão de Festas", "Salão de Jogos", "Quadra", "Churrasqueira"];


  const formatarData = (texto) => {
    const cleaned = texto.replace(/\D/g, "");
    const formatted = cleaned
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .replace(/^(\d{2})\/(\d{2})\/(\d{4}).*/, "$1/$2/$3");
    return formatted;
  };


  const formatarHora = (texto) => {
    const cleaned = texto.replace(/\D/g, "");
    const formatted = cleaned
      .replace(/^(\d{2})(\d)/, "$1:$2")
      .slice(0, 5);
    return formatted;
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Text
          style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
          onPress={() => router.back()}
        >
          ← Voltar
        </Text>
        <Text style={styles.title}>Criar Reserva</Text>

        {/* 🔽 Dropdown de Local */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Local</Text>
          <Menu
            visible={menuVisible}
            onDismiss={fecharMenu}
            anchor={
              <TouchableOpacity
                onPress={abrirMenu}
                style={styles.dropdown}
              >
                <Text style={{ color: localSelecionado ? "#002C21" : "#888" }}>
                  {localSelecionado || "Selecione o local"}
                </Text>
              </TouchableOpacity>
            }
          >
            {locais.map((local) => (
              <Menu.Item
                key={local}
                onPress={() => {
                  setLocalSelecionado(local);
                  setNome(local); // Atualiza no hook
                  fecharMenu();
                }}
                title={local}
              />
            ))}
          </Menu>
        </View>

        {/* 📅 Data */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={10}
            value={data}
            onChangeText={(text) => setData(formatarData(text))}
          />
        </View>

        {/* ⏰ Horário */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Horário</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={5}
            value={horario}
            onChangeText={(text) => setHorario(formatarHora(text))}
          />
        </View>

        {/* 💾 Botão */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={salvarReserva}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDEB",
    paddingHorizontal: 16,
    paddingTop: 40,
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#002C21",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFDEB",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#002C21",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
