import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { obterToken } from '@/utils/auth'; // ajuste o caminho conforme sua estrutura


// A interface deve estar FORA do componente
interface MyJwtPayload {
  id: number;
}

export default function MenuScreen() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const token = await obterToken(); // já pega 'token'
        console.log('Token bruto:', token);
        if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        setIsAdmin(decoded.id === 1);
        }
      } catch (err) {
        console.error('Erro ao verificar token:', err);
      }
    };

    verificarToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {isAdmin ? (
        <>
          <MenuButton label="Ocorrências" onPress={() => router.push('/(tabs)/ocorrenciasAdmin')} />
          <MenuButton label="Reservas" onPress={() => router.push('/(tabs)/reservas')} />
          <MenuButton label="Moradores" onPress={() => router.push('/(tabs)/moradores')} />
          <MenuButton label="Usuários" onPress={() => router.push('/(tabs)/usuarios')} />
          <MenuButton label="Visitantes" onPress={() => router.push('/(tabs)/visitantes')} />
        </>
      ) : (
        <>
          <MenuButton label="Ocorrências" onPress={() => router.push('/(tabs)/ocorrencias')} />
          <MenuButton label="Reservas" onPress={() => router.push('/(tabs)/reservas')} />
          <MenuButton label="Moradores" onPress={() => router.push('/(tabs)/moradores')} />
          <MenuButton label="Visitantes" onPress={() => router.push('/(tabs)/visitantes')} />
        </>
      )}

      <MenuButton label="Sair" onPress={handleLogout} />
    </ScrollView>
  );
}

const MenuButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuButton}>
    <Text style={styles.menuButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFDEB',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#002C21',
  },
  menuButton: {
    backgroundColor: '#002C21',
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%',
    marginBottom: 16,
  },
  menuButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
