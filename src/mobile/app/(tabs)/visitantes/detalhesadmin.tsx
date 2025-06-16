
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVisitanteDetalhes } from '@/hooks/visitantes/useVisitanteDetalhes';

export default function DetalhesAdminVisitanteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: visitante, isLoading, error } = useVisitanteDetalhes(id);
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }

  if (error || !visitante) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro ao carregar visitante.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.back} onPress={() => router.back()}>← Voltar</Text>
      <Text style={styles.title}>Detalhes do Visitante</Text>
      <Text style={styles.item}><Text style={styles.label}>Nome:</Text> {visitante.nome}</Text>
      <Text style={styles.item}><Text style={styles.label}>Documento:</Text> {visitante.documento}</Text>
      <Text style={styles.item}><Text style={styles.label}>Apartamento:</Text> {visitante.apartamento}</Text>
      <Text style={styles.item}><Text style={styles.label}>Data da Visita:</Text> {new Date(visitante.dataVisita).toLocaleDateString()}</Text>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => router.push(`/visitantes/editaradmin?id=${visitante._id}`)}
      >
        <Text style={styles.textoBotao}>EDITAR</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002C21',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    color: '#002C21',
  },
  label: {
    fontWeight: 'bold',
  },
  botaoEditar: {
    marginTop: 20,
    backgroundColor: '#002C21',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  back: {
    color: '#002C21',
    fontSize: 16,
    marginBottom: 10,
  },
});
