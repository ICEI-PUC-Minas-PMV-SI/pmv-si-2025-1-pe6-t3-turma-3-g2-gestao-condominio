import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVisitanteDetalhes } from '@/hooks/visitantes/useVisitanteDetalhes';

export default function VisitantesDetalhesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { visitante, loading, error } = useVisitanteDetalhes(id);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error || !visitante) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar detalhes do visitante.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Visitante</Text>
      <Text style={styles.item}>Nome: {visitante.nome}</Text>
      <Text style={styles.item}>Documento: {visitante.documento}</Text>
      <Text style={styles.item}>Apartamento: {visitante.apartamento}</Text>
      <Text style={styles.item}>Data da Visita: {new Date(visitante.dataVisita).toLocaleDateString()}</Text>
      <Button title="Editar" onPress={() => router.push(`/visitantes/editar?id=${visitante._id}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 8 },
});
