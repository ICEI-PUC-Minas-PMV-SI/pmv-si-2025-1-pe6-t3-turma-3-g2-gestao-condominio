import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useReservaDetalhes(id: string) {
  const [reserva, setReserva] = useState<{
    nome: string;
    data: string;
    horario: string;
    status: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setErro("ID da reserva não fornecido.");
      setLoading(false);
      return;
    }

    const fetchReserva = async () => {
      try {
        setLoading(true);
        const token = await obterToken();

        if (!token) {
          Alert.alert("Erro", "Usuário não autenticado.");
          setErro("Sem token");
          return;
        }

        const response = await fetch(`${API_URL}/api/reservas/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          Alert.alert("Erro", data.message || "Erro ao carregar reserva.");
          setErro(data.message || "Erro desconhecido");
          return;
        }

        setReserva(data);
      } catch (err: any) {
        console.error("Erro ao buscar detalhes da reserva:", err);
        Alert.alert("Erro", "Erro na comunicação com o servidor.");
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id]);

  return { reserva, loading, erro };
}
