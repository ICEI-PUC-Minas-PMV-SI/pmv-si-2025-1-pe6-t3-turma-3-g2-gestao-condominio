import Morador from "../models/moradorModel.js";

export const criarMorador = async (req, res) => {
  try {
    const morador = await Morador.create(req.body);
    res.status(201).json(morador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarMoradores = async (req, res) => {
  try {
    const moradores = await Morador.findAll();
    res.json(moradores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const buscarMoradorPorId = async (req, res) => {
  try {
    const morador = await Morador.findByPk(req.params.id);
    if (!morador) return res.status(404).json({ error: "Morador não encontrado" });
    res.json(morador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarMorador = async (req, res) => {
  try {
    const [updated] = await Morador.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Morador não encontrado" });
    const moradorAtualizado = await Morador.findByPk(req.params.id);
    res.json(moradorAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletarMorador = async (req, res) => {
  try {
    const deleted = await Morador.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Morador não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};