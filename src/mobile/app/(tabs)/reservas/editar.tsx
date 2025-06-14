import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Menu, Provider } from "react-native-paper";
import { useEditarReserva } from "@/hooks/reservas/useEditarReserva";

export default function EditarReservaScreen() {
  const router = useRouter();
  const {
    id,
    nome: nomeExistente,
    data: dataExistente,
    horario: horarioExistente,
  } = useLocalSearchParams();

  const {
    nome,
    setNome,
    data,
    setData,
    horario,
    setHorario,
    atualizarReserva,
    loading,
  } = useEditarReserva(id as string);

  const [menuVisible, setMenuVisible] = useState(false);

  const abrirMenu = () => setMenuVisible(true);
  const fecharMenu = () => setMenuVisible(false);

  const locais = ["Salão de Festas", "Salão de Jogos", "Quadra", "Churrasqueira"];

  useEffect(() => {
    if (nomeExistente) {
      setNome(Array.isArray(nomeExistente) ? nomeExistente[0] : nomeExistente);
    }
    if (dataExistente) {
      setData(Array.isArray(dataExistente) ? dataExistente[0] : dataExistente);
    }
    if (horarioExistente) {
      setHorario(Array.isArray(horarioExistente) ? horarioExistente[0] : horarioExistente);
    }
  }, [nomeExistente, dataExistente, horarioExistente]);

  const formatarData = (texto: string) => {
    const cleaned = texto.replace(/\D/g, "");
    const formatted = cleaned
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .replace(/^(\d{2})\/(\d{2})\/(\d{4}).*/, "$1/$2/$3");
    return formatted;
  };

  const formatarHora = (texto: string) => {
    const cleaned = texto.replace(/\D/g, "");
    const formatted = cleaned
      .replace(/^(\d{2})(\d)/, "$1:$2")
      .slice(0, 5);
    return formatted;
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        {/* 🔙 Botão Voltar */}
        <Text
          style={{ color: "#002C21", fontSize: 16, marginBottom: 20, marginLeft: 20 }}
          onPress={() => router.back()}
        >
          ← Voltar
        </Text>

        <Text style={styles.title}>Editar Reserva</Text>

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
                <Text style={{ color: nome ? "#002C21" : "#888" }}>
                  {nome || "Selecione o local"}
                </Text>
              </TouchableOpacity>
            }
          >
            {locais.map((local) => (
              <Menu.Item
                key={local}
                onPress={() => {
                  setNome(local);
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
          onPress={atualizarReserva}
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
