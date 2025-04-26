import Ocorrencia from '../models/ocorrenciaModel.js';
import { User } from '../models/user.js';

export const createOcorrencia = async (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        const userId = req.userId;
        if (!titulo || !descricao) {
            return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
        }
        const ocorrencia = await Ocorrencia.create({ titulo, descricao, status: 'aberto', userId });
        res.status(201).json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOcorrencias = async (req, res) => {
    try {
        const ocorrencias = await Ocorrencia.findAll({
            include: {
                model: User,
                attributes: ['id', 'name', 'email']
            }
        });
        res.status(200).json(ocorrencias);
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
        const userId = req.userId;
        const ocorrencia = await Ocorrencia.findByPk(id);

        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada' });
        }

        if (ocorrencia.userId !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para visualizar esta ocorrência.' });
        }

        res.status(200).json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOcorrenciaDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const ocorrencia = await Ocorrencia.findByPk(id, {
            include: {
                model: User,
                attributes: ['id', 'name', 'email'],
            },
        });

        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada.' });
        }

        res.status(200).json(ocorrencia);
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

        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada.' });
        }

        if (ocorrencia.userId !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para atualizar esta ocorrência.' });
        }

        if (ocorrencia.status !== 'aberto') {
            return res.status(403).json({ message: 'Ocorrência não está aberta para alteração.' });
        }

        ocorrencia.titulo = titulo;
        ocorrencia.descricao = descricao;
        await ocorrencia.save();
        res.status(200).json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOcorrenciaStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ocorrencia = await Ocorrencia.findByPk(id);

        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada' });
        }

        ocorrencia.status = status;
        await ocorrencia.save();

        const ocorrenciaAtualizada = await Ocorrencia.findByPk(id, {
            include: {
                model: User,
                attributes: ['id', 'name', 'email'],
            },
        });

        res.status(200).json(ocorrenciaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const ocorrencia = await Ocorrencia.findByPk(id);

        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada.' });
        }

        if (ocorrencia.userId !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para excluir esta ocorrência.' });
        }

        await ocorrencia.destroy();
        res.status(200).json({ message: 'Ocorrência excluída com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
