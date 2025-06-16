import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
      <Text style={styles.voltar} onPress={() => router.replace('/visitantes')}>← Voltar</Text>
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
