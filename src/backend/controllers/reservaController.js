import Reserva from '../models/reservaModel.js';
import { User } from '../models/user.js';

export const criarReserva = async (req, res) => {
  try {
    const userId = req.userId;
    const { nome, data, horario } = req.body;
    const reserva = await Reserva.create({ nome, data, horario, userId });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    });
    res.json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const buscarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    });

    if (!reserva) return res.status(404).json({ error: "Reserva não encontrada" });

    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, data, horario } = req.body;
    const userId = req.userId;
    const reserva = await Reserva.findByPk(id);

    if (!reserva || reserva.userId !== userId) {
      return res.status(403).json({ error: "Você não tem permissão para alterar esta reserva." });
    }

    reserva.nome = nome;
    reserva.data = data;
    reserva.horario = horario;
    await reserva.save();

    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const reserva = await Reserva.findByPk(id);

    if (!reserva || reserva.userId !== userId) {
      return res.status(403).json({ error: "Você não tem permissão para cancelar esta reserva." });
    }

    reserva.status = "cancelado";
    await reserva.save();

    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const historicoReservas = async (req, res) => {
  try {
    const userId = req.userId;
    const historico = await Reserva.findAll({
      where: { userId },
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
      order: [["createdAt", "DESC"]],
    });

    if (historico.length === 0) {
      return res.status(404).json({ error: "Nenhuma reserva encontrada" });
    }

    res.json(historico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
