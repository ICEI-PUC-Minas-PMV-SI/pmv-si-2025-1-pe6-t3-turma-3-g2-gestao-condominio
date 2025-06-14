import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useVisitantes } from '@/hooks/visitantes/useVisitantes';

export default function VisitantesScreen() {
  const router = useRouter();
  const { visitantes, loading, error } = useVisitantes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitantes</Text>
      <Button title="Novo Visitante" onPress={() => router.push('/visitantes/criar')} />

      {loading && <Text>Carregando...</Text>}
      {error && <Text>Erro: {error}</Text>}

      <FlatList
        data={visitantes}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome} - {item.apartamento}</Text>
            <Button title="Detalhes" onPress={() => router.push(`/visitantes/detalhes?id=${item._id}`)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemText: { fontSize: 16, marginBottom: 5 },
});
