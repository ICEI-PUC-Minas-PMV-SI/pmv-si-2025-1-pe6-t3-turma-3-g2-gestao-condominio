import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAlterarStatusOcorrencia } from "@/hooks/ocorrencias/useAlterarStatusOcorrencia";
import { Picker } from '@react-native-picker/picker';
import '../../../styles/web-select.css'
export default function EditarStatusOcorrenciaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const statusInicial = Array.isArray(params.status) ? params.status[0] : params.status;
  const titulo = Array.isArray(params.titulo) ? params.titulo[0] : params.titulo;

  const { status, setStatus, loading, alterarStatus } = useAlterarStatusOcorrencia(
    id as string,
    statusInicial as string
  );

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => router.push("/ocorrenciasAdmin")}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      {/* Título com nome da ocorrência */}
      <Text style={styles.title}>
        Alterar Status da Ocorrência {titulo}
      </Text>

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value)}
          style={[styles.picker, Platform.OS === 'web' && { color: '#002C21', backgroundColor: '#FFFDEB' }]}
          dropdownIconColor="#002C21"
        >
          <Picker.Item label="Aberto" value="Aberto" />
          <Picker.Item label="Em andamento" value="Em andamento" />
          <Picker.Item label="Fechado" value="Fechado" />
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#002C21" />
      ) : (
        <View style={styles.buttonWrapper}>
          <Button
            title="Salvar"
            onPress={() => {
              alterarStatus();
            }}
            color="#002C21"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDEB",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  voltar: {
    color: "#002C21",
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002C21",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002C21",
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#002C21",
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: "#FFFDEB",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#002C21",
  },
  buttonWrapper: {
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
