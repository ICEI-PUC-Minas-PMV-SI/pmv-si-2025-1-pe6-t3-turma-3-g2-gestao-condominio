// editar.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVisitanteDetalhes } from '@/hooks/visitantes/useVisitanteDetalhes';
import { useEditarVisitante } from '@/hooks/visitantes/useEditarVisitante';

export default function EditarVisitanteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { visitante, loading, error } = useVisitanteDetalhes(id);
  const {
    nome, setNome,
    documento, setDocumento,
    apartamento, setApartamento,
    dataVisita, setDataVisita,
    atualizarVisitante
  } = useEditarVisitante(id);

  useEffect(() => {
    if (visitante) {
      setNome(visitante.nome);
      setDocumento(visitante.documento);
      setApartamento(visitante.apartamento);
      setDataVisita(visitante.dataVisita?.split('T')[0] || '');
    }
  }, [visitante]);

  const handleSubmit = async () => {
    await atualizarVisitante();
  };

  if (loading) {
    return <View style={styles.container}><Text>Carregando visitante...</Text></View>;
  }

  if (error || !visitante) {
    return <View style={styles.container}><Text>Erro ao carregar visitante.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.voltar} onPress={() => router.replace('/visitantes')}>← Voltar</Text>
      <Text style={styles.title}>Editar Visitante</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} />
      <TextInput style={styles.input} placeholder="Apartamento" value={apartamento} onChangeText={setApartamento} />
      <TextInput style={styles.input} placeholder="Data da visita (AAAA-MM-DD)" value={dataVisita} onChangeText={setDataVisita} />

      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.textoBotao}>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDEB', padding: 20 },
  voltar: { color: '#002C21', fontSize: 16, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#002C21', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', borderColor: '#002C21', borderWidth: 1, padding: 10, marginBottom: 12, borderRadius: 8, color: '#000' },
  botao: { backgroundColor: '#002C21', paddingVertical: 12, borderRadius: 8, marginTop: 10 },
  textoBotao: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
