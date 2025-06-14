
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVisitanteDetalhes } from '@/hooks/visitantes/useVisitanteDetalhes';

export default function DetalhesAdminVisitanteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: visitante, isLoading, error } = useVisitanteDetalhes(id);
  const router = useRouter();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (error || !visitante) {
    return <Text>Erro ao carregar visitante.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Visitante</Text>
      <Text>Nome: {visitante.nome}</Text>
      <Text>Documento: {visitante.documento}</Text>
      <Text>Apartamento: {visitante.apartamento}</Text>
      <Text>Data da Visita: {new Date(visitante.dataVisita).toLocaleDateString()}</Text>
      <Button title="Editar" onPress={() => router.push(`/visitantes/editaradmin?id=${visitante._id}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
});
