
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVisitanteDetalhes } from '@/hooks/visitantes/useVisitanteDetalhes';
import { useEditarVisitanteAdmin } from '@/hooks/visitantes/useEditarVisitanteAdmin';

export default function EditarAdminVisitanteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: visitante, isLoading } = useVisitanteDetalhes(id);
  const editarVisitante = useEditarVisitanteAdmin();

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [dataVisita, setDataVisita] = useState('');

  useEffect(() => {
    if (visitante) {
      setNome(visitante.nome);
      setDocumento(visitante.documento);
      setApartamento(visitante.apartamento);
      setDataVisita(visitante.dataVisita.split('T')[0]);
    }
  }, [visitante]);

  const handleSubmit = async () => {
    try {
      await editarVisitante.mutateAsync({
        id: id!,
        data: { nome, documento, apartamento, dataVisita }
      });
      Alert.alert('Sucesso', 'Visitante atualizado com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar visitante.');
    }
  };

  if (isLoading) {
    return <Text>Carregando visitante...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Documento:</Text>
      <TextInput style={styles.input} value={documento} onChangeText={setDocumento} />

      <Text style={styles.label}>Apartamento:</Text>
      <TextInput style={styles.input} value={apartamento} onChangeText={setApartamento} />

      <Text style={styles.label}>Data da Visita:</Text>
      <TextInput style={styles.input} value={dataVisita} onChangeText={setDataVisita} />

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginTop: 4 },
});
