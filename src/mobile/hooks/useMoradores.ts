import { useState, useEffect } from "react";
import { obterToken } from "@/utils/auth";
import { jwtDecode } from 'jwt-decode';
import Constants from "expo-constants";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

type DecodedToken = {
  id: number;
  // coloque outros campos que precisar aqui
};

export function useMoradores() {
  const [moradores, setMoradores] = useState([]);
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

      // Se não for admin, garante que retorna um array com os dados do usuário
      if (!isAdmin) {
        setMoradores(Array.isArray(data) ? data : [data]);
      } else {
        setMoradores(data);
      }
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoradores();
  }, []);

  return { moradores, loading, erro, refetch: fetchMoradores };
}