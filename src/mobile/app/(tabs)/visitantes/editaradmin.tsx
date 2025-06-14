import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
    return (
      <View style={styles.container}>
        <Text>Carregando visitante...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.voltar} onPress={() => router.replace('/visitantes/admin')}>← Voltar</Text>
      <Text style={styles.title}>Editar Visitante</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Apartamento"
        value={apartamento}
        onChangeText={setApartamento}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Data da visita (AAAA-MM-DD)"
        value={dataVisita}
        onChangeText={setDataVisita}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.textoBotao}>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDEB',
    padding: 20,
  },
  voltar: {
    color: '#002C21',
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#002C21',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#002C21',
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    color: '#000',
  },
  botao: {
    backgroundColor: '#002C21',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
