import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCriarVisitante } from '@/hooks/useCriarVisitante';

export default function CriarVisitanteScreen() {
  const router = useRouter();
  const { criarVisitante } = useCriarVisitante();

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [dataVisita, setDataVisita] = useState('');

  const handleCriar = async () => {
    try {
      await criarVisitante({
        nome,
        documento,
        apartamento,
        dataVisita
      });
      Alert.alert('Sucesso', 'Visitante criado com sucesso!');
      router.push('/visitantes');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar o visitante');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Visitante</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
      />
      <TextInput
        style={styles.input}
        placeholder="Apartamento"
        value={apartamento}
        onChangeText={setApartamento}
      />
      <TextInput
        style={styles.input}
        placeholder="Data da visita (YYYY-MM-DD)"
        value={dataVisita}
        onChangeText={setDataVisita}
      />

      <Button title="Criar Visitante" onPress={handleCriar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
