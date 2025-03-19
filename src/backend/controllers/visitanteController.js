import Visitante from '../models/visitanteModel.js';

export const criarVisitante = async (req, res) => {
  try {
    const visitante = await Visitante.create(req.body);
    res.status(201).json(visitante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarVisitantes = async (req, res) => {
  try {
    const visitantes = await Visitante.findAll();
    res.json(visitantes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const buscarVisitantePorId = async (req, res) => {
  try {
    const visitante = await Visitante.findByPk(req.params.id);
    if (!visitante) return res.status(404).json({ error: "Visitante não encontrado" });
    res.json(visitante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarVisitante = async (req, res) => {
  try {
    const [updated] = await Visitante.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Visitante não encontrado" });
    const visitanteAtualizado = await Visitante.findByPk(req.params.id);
    res.json(visitanteAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletarVisitante = async (req, res) => {
  try {
    const deleted = await Visitante.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Visitante não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
