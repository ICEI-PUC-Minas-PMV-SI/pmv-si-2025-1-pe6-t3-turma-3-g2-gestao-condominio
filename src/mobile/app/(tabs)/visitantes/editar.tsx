import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVisitanteDetalhes } from '@/hooks/visitantes/useVisitanteDetalhes';
import { useEditarVisitante } from '@/hooks/visitantes/useEditarVisitante';

export default function EditarVisitanteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { visitante, loading, error } = useVisitanteDetalhes(id);
  const editarVisitante = useEditarVisitante();

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [dataVisita, setDataVisita] = useState('');

  useEffect(() => {
    if (visitante) {
      setNome(visitante.nome);
      setDocumento(visitante.documento);
      setApartamento(visitante.apartamento);
      setDataVisita(visitante.dataVisita?.split('T')[0] || '');
    }
  }, [visitante]);

  const handleSubmit = async () => {
    try {
      await editarVisitante(id, {
        nome,
        documento,
        apartamento,
        dataVisita: new Date(dataVisita).toISOString(),
      });
      Alert.alert('Sucesso', 'Visitante atualizado com sucesso');
      router.push('/visitantes');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível atualizar o visitante');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando visitante...</Text>
      </View>
    );
  }

  if (error || !visitante) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar visitante.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Visitante</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} />
      <TextInput style={styles.input} placeholder="Apartamento" value={apartamento} onChangeText={setApartamento} />
      <TextInput
        style={styles.input}
        placeholder="Data da visita (AAAA-MM-DD)"
        value={dataVisita}
        onChangeText={setDataVisita}
      />
      <Button title="Salvar" onPress={handleSubmit} />
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
