import { useState, useEffect } from "react";
import { obterToken } from "@/utils/auth";
import { jwtDecode } from 'jwt-decode';
import Constants from "expo-constants";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

type DecodedToken = {
  id: number;
};

export function useMoradores() {
  const [moradores, setMoradores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const fetchMoradores = async () => {
    setLoading(true);
    setErro("");
    try {
      const token = await obterToken();
      if (!token) throw new Error('Token não encontrado');

      // Decodifica o token para verificar se é admin
      const decoded = jwtDecode<DecodedToken>(token);
      const isAdmin = decoded?.id === 1; // Admin é o usuário com ID = 1

      // Define a URL baseada no tipo de usuário
      const url = isAdmin ? '/moradores' : '/moradores/usuario';

      const res = await fetch(`${API_URL}/api${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao buscar moradores");

      if (!isAdmin) {
        setMoradores(Array.isArray(data) ? data : [data]);
      } else {
        setMoradores(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoradores();
  }, []);

  return { moradores, loading, erro, refetch: fetchMoradores };
}