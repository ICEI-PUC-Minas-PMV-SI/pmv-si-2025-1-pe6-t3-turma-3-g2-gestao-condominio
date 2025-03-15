import Reserva from '../models/reservaModel.js';

// Criar reserva
exports.criarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar reservas
exports.listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar reserva por ID
exports.buscarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (!reserva) return res.status(404).json({ error: "Reserva não encontrada" });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar reserva
exports.atualizarReserva = async (req, res) => {
  try {
    const [updated] = await Reserva.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Reserva não encontrada" });
    const reservaAtualizada = await Reserva.findByPk(req.params.id);
    res.json(reservaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancelar reserva
exports.cancelarReserva = async (req, res) => {
  try {
    const [updated] = await Reserva.update({ status: "cancelado" }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Reserva não encontrada" });
    const reservaCancelada = await Reserva.findByPk(req.params.id);
    res.json(reservaCancelada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Histórico
exports.historicoReservas = async (req, res) => {
  try {
    const historico = await Reserva.findAll({ order: [["createdAt", "DESC"]] });
    res.json(historico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
