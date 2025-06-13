import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCriarVisitante } from '@/hooks/visitantes/useCriarVisitante';
import { useRouter } from 'expo-router';

export default function VisitantesAdminScreen() {
  const router = useRouter();
  const { visitantes, loading, error } = useVisitantesAdmin();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos os Visitantes</Text>

      {loading && <Text>Carregando...</Text>}
      {error && <Text>Erro: {error}</Text>}

      <FlatList
        data={visitantes}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome} - {item.apartamento}</Text>
            <Text>Documento: {item.documento}</Text>
            <Text>Data Visita: {new Date(item.dataVisita).toLocaleDateString()}</Text>
            <Text>Morador: {item.user?.nome ?? 'N/A'}</Text>
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
