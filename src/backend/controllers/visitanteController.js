import Visitante from '../models/Visitante.js';

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
    res.status(500).json({ message: 'Erro ao criar visitante', error });
  }
};

export const listarVisitantes = async (req, res) => {
  try {
    const visitantes = await Visitante.findAll({ where: { status: 'ativo' } });
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar visitantes', error });
  }
};

export const listarVisitantesUsuario = async (req, res) => {
  try {
    const userId = req.userId;
    const visitantes = await Visitante.findAll({
      where: { userId, status: 'ativo' },
    });
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar visitantes do usuário', error });
  }
};

export const buscarVisitantePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante || visitante.status !== 'ativo') {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar visitante', error });
  }
};

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

    visitante.nome = nome || visitante.nome;
    visitante.documento = documento || visitante.documento;
    visitante.apartamento = apartamento || visitante.apartamento;
    visitante.dataVisita = dataVisita || visitante.dataVisita;

    await visitante.save();
    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar visitante', error });
  }
};

export const deletarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante || visitante.status !== 'ativo') {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    await visitante.destroy();
    res.status(200).json({ message: 'Visitante removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover visitante', error });
  }
};
