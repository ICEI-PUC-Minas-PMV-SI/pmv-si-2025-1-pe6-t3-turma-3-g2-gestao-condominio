
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useVisitantesAdmin } from '@/hooks/visitantes/useVisitantesAdmin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function VisitantesAdminScreen() {
  const { visitantes, loading, error } = useVisitantesAdmin();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.voltar} onPress={() => router.replace('/menu')}>← Voltar</Text>
      <Text style={styles.titulo}>Todos os Visitantes</Text>

      {loading && <Text style={styles.status}>Carregando...</Text>}
      {error && <Text style={styles.status}>Erro: {error}</Text>}

      <ScrollView contentContainerStyle={styles.lista}>
        {visitantes.map((v) => (
          <View key={v._id} style={styles.card}>
            <Text style={styles.nome}>{v.nome}</Text>
            <Text style={styles.info}>Apt: {v.apartamento}</Text>
            <Text style={styles.info}>Documento: {v.documento}</Text>
            <Text style={styles.info}>
              Data da Visita: {new Date(v.dataVisita).toLocaleDateString()}
            </Text>
            <Text style={styles.info}>
              Morador: {v.user?.nome ?? 'N/A'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDEB',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  voltar: {
    color: '#002C21',
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002C21',
    textAlign: 'center',
    marginBottom: 20,
  },
  status: {
    textAlign: 'center',
    color: '#002C21',
    fontSize: 16,
  },
  lista: {
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#002C21',
    borderRadius: 10,
    backgroundColor: '#FFFDEB',
    padding: 16,
    width: '90%',
    maxWidth: 320,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  nome: {
    color: '#002C21',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  info: {
    color: '#002C21',
    fontSize: 14,
    marginBottom: 2,
  },
});
