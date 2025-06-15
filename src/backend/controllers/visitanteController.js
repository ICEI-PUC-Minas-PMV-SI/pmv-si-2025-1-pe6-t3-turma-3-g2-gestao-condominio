import Visitante from '../models/visitanteModel.js';
import { User } from '../models/user.js';

// Criar visitante
export const criarVisitante = async (req, res) => {
  try {
    const { nome, documento, apartamento, dataVisita } = req.body;
    const userId = req.userId;

    const visitanteExistente = await Visitante.findOne({ where: { documento } });
    if (visitanteExistente) {
      return res.status(400).json({ message: 'Documento já cadastrado.' });
    }

    const novoVisitante = await Visitante.create({
      nome,
      documento,
      apartamento,
      dataVisita,
      status: 'ativo',
      userId,
    });

    res.status(201).json(novoVisitante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar visitante', error: error.message });
  }
};

// Listar todos os visitantes (apenas admin)
export const listarVisitantes = async (req, res) => {
  try {
    if (req.userId !== 1) {
      return res.status(403).json({ message: 'Apenas administradores podem ver todos os visitantes.' });
    }

    const visitantes = await Visitante.findAll({
      where: { status: 'ativo' },
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    });

    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar visitantes', error: error.message });
  }
};

// Listar visitantes do usuário autenticado
export const listarVisitantesUsuario = async (req, res) => {
  try {
    const userId = req.userId;
    const visitantes = await Visitante.findAll({
      where: { userId, status: 'ativo' },
    });
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar visitantes do usuário', error: error.message });
  }
};

// Buscar visitante por ID (só dono ou admin)
export const buscarVisitantePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante || visitante.status !== 'ativo') {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    if (visitante.userId !== req.userId && req.userId !== 1) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar visitante', error: error.message });
  }
};

// Atualizar visitante (só dono ou admin)
export const atualizarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, documento, apartamento, dataVisita } = req.body;
    const userId = req.userId;

    const visitante = await Visitante.findByPk(id);
    if (!visitante || visitante.status !== 'ativo') {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    if (visitante.userId !== userId && userId !== 1) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    await visitante.update({
      nome: nome || visitante.nome,
      documento: documento || visitante.documento,
      apartamento: apartamento || visitante.apartamento,
      dataVisita: dataVisita || visitante.dataVisita,
    });

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar visitante', error: error.message });
  }
};

// Deletar visitante (admin ou dono) - soft delete
export const deletarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const visitante = await Visitante.findByPk(id);
    if (!visitante || visitante.status !== 'ativo') {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    if (visitante.userId !== userId && userId !== 1) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    visitante.status = 'inativo';
    await visitante.save();

    res.status(200).json({ message: 'Visitante removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover visitante', error: error.message });
  }
};

// Opcional: pegar visitante do usuário logado (último ou único)
export const getVisitanteDoUsuario = async (req, res) => {
  try {
    const visitante = await Visitante.findOne({
      where: { userId: req.userId, status: 'ativo' },
      order: [['createdAt', 'DESC']],
    });

    if (!visitante) {
      return res.status(404).json({ message: 'Nenhum visitante encontrado para este usuário.' });
    }

    res.json(visitante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar visitante', error: error.message });
  }
};
