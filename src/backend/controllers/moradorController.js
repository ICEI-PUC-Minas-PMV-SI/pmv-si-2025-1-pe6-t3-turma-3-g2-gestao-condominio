import Morador from "../models/moradorModel.js";
import { User } from "../models/user.js";

export const criarMorador = async (req, res) => {
  try {
    const userId = req.userId; 
    const { nome, apartamento, bloco, contato } = req.body;
    const morador = await Morador.create({ nome, apartamento, bloco, contato, userId });
    res.status(201).json(morador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarMoradores = async (req, res) => {
  try {
    if (req.userId !== 1) {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores podem ver todos os moradores." });
    }

    const moradores = await Morador.findAll({
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });
    res.json(moradores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const buscarMoradorPorId = async (req, res) => {
  try {
    const morador = await Morador.findByPk(req.params.id);
    if (!morador) return res.status(404).json({ error: "Morador não encontrado" });

    if (morador.userId !== req.userId && req.userId !== 1) {
      return res.status(403).json({ error: "Você não tem permissão para ver este morador." });
    }

    res.json(morador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarMorador = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const morador = await Morador.findByPk(id);
    if (!morador) return res.status(404).json({ error: "Morador não encontrado" });

    if (morador.userId !== userId && userId !== 1) {
      return res.status(403).json({ error: "Você não tem permissão para atualizar este morador." });
    }

    const { nome, apartamento, bloco, contato } = req.body;

    await morador.update({ nome, apartamento, bloco, contato });

    res.json(morador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deletarMorador = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (userId !== 1) {
      return res.status(403).json({ error: "Apenas administradores podem deletar moradores." });
    }

    const morador = await Morador.findByPk(id);
    if (!morador) return res.status(404).json({ error: "Morador não encontrado" });

    await morador.destroy();

    res.status(200).json({ message: "Morador excluído com sucesso." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMoradorDoUsuario = async (req, res) => {
  try {
    const morador = await Morador.findOne({
      where: { userId: req.userId }
    });

    if (!morador) {
      return res.status(404).json({ error: 'Morador não encontrado para este usuário.' });
    }

    res.json(morador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};