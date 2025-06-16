import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { obterToken } from "@/utils/auth";

const rawUrl = Constants.expoConfig?.extra?.API_URL;
const API_URL = (!rawUrl || rawUrl.trim() === "") ? "http://localhost:3000" : rawUrl;

export function useMoradorDetalhes(id: string) {
  const [morador, setMorador] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchMorador = async () => {
      setLoading(true);
      try {
        const token = await obterToken();

        const res = await fetch(`${API_URL}/api/moradores/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao buscar morador");

        setMorador(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMorador();
  }, [id]);

  return { morador, loading, erro };
}