// controllers/ocorrenciaController.js
import Ocorrencia from '../models/ocorrenciaModel.js';

export const createOcorrencia = async (req, res) => {
    try {
        const { titulo, descricao, data, status } = req.body;
        const ocorrencia = await Ocorrencia.create({ titulo, descricao, data, status });
        res.status(201).json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOcorrencias = async (req, res) => {
    try {
        const ocorrencias = await Ocorrencia.findAll();
        res.status(200).json(ocorrencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOcorrenciaById = async (req, res) => {
    try {
        const { id } = req.params;
        const ocorrencia = await Ocorrencia.findByPk(id);
        if (ocorrencia) {
            res.status(200).json(ocorrencia);
        } else {
            res.status(404).json({ message: 'Ocorrência não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, data, status } = req.body;
        const ocorrencia = await Ocorrencia.findByPk(id);
        if (ocorrencia) {
            ocorrencia.titulo = titulo;
            ocorrencia.descricao = descricao;
            ocorrencia.data = data;
            ocorrencia.status = status;
            await ocorrencia.save();
            res.status(200).json(ocorrencia);
        } else {
            res.status(404).json({ message: 'Ocorrência não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;
        const ocorrencia = await Ocorrencia.findByPk(id);
        if (ocorrencia) {
            await ocorrencia.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Ocorrência não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};