// controllers/ocorrenciaController.js
import Ocorrencia from '../models/ocorrenciaModel.js';
import { User } from '../models/user.js';

export const createOcorrencia = async (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        const userId = req.userId;
        const ocorrencia = await Ocorrencia.create({ titulo, descricao, status: 'aberto', userId });
        res.status(201).json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOcorrencias = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId);

        if (userId === 1) {
            const ocorrencias = await Ocorrencia.findAll({
                include: {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            });
            res.status(200).json(ocorrencias);
        } else {
            res.status(403).json({ message: 'Permissão negada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOcorrenciasByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const ocorrencias = await Ocorrencia.findAll({ where: { userId } });
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
        const { titulo, descricao } = req.body;
        const userId = req.userId;
        const ocorrencia = await Ocorrencia.findByPk(id);

        if (ocorrencia && ocorrencia.userId === userId && ocorrencia.status === 'aberto') {
            ocorrencia.titulo = titulo;
            ocorrencia.descricao = descricao;
            await ocorrencia.save();
            res.status(200).json(ocorrencia);
        } else {
            res.status(403).json({ message: 'Ocorrência não está aberta para alteração.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar status da ocorrência pelo admin
export const updateOcorrenciaStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.userId;

        if (userId === 1) {
            const ocorrencia = await Ocorrencia.findByPk(id);
            if (ocorrencia) {
                ocorrencia.status = status;
                await ocorrencia.save();
                res.status(200).json(ocorrencia);
            } else {
                res.status(404).json({ message: 'Ocorrência não encontrada' });
            }
        } else {
            res.status(403).json({ message: 'Permissão negada' });
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