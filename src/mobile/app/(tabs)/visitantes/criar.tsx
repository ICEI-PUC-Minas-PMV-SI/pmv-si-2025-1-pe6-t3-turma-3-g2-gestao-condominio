import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCriarVisitante } from '@/hooks/visitantes/useCriarVisitante';

export default function CriarVisitanteScreen() {
  const router = useRouter();
  const criarVisitante = useCriarVisitante();

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [dataVisita, setDataVisita] = useState('');

  const handleSubmit = async () => {
    try {
      await criarVisitante({
        nome,
        documento,
        apartamento,
        dataVisita: new Date(dataVisita).toISOString(),
      });
      Alert.alert('Sucesso', 'Visitante criado com sucesso');
      router.push('/visitantes');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o visitante');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Visitante</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} />
      <TextInput style={styles.input} placeholder="Apartamento" value={apartamento} onChangeText={setApartamento} />
      <TextInput
        style={styles.input}
        placeholder="Data da visita (AAAA-MM-DD)"
        value={dataVisita}
        onChangeText={setDataVisita}
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
