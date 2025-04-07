import Visitante from '../models/visitanteModel.js';
import { User } from '../models/user.js';
import { validationResult } from 'express-validator';  

export const criarVisitante = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, documento, apartamento, dataVisita } = req.body;
    const userId = req.userId;

    if (!nome || !documento || !apartamento || !dataVisita) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const documentoExistente = await Visitante.findOne({ where: { documento } });
    if (documentoExistente) {
      return res.status(400).json({ error: 'Documento já cadastrado.' });
    }

    const visitante = await Visitante.create({ nome, documento, apartamento, dataVisita, userId });
    res.status(201).json(visitante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarVisitantes = async (req, res) => {
  try {
    const userId = req.userId;

    const visitantes = await Visitante.findAll({
      where: { userId }, 
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    });
    
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarVisitantePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante) {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, documento, apartamento, dataVisita } = req.body;
    const visitante = await Visitante.findByPk(id);

    if (!visitante) {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    visitante.nome = nome || visitante.nome;
    visitante.documento = documento || visitante.documento;
    visitante.apartamento = apartamento || visitante.apartamento;
    visitante.dataVisita = dataVisita || visitante.dataVisita;
    
    await visitante.save();
    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante) {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    await visitante.destroy();
    res.status(200).json({ message: 'Visitante excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
