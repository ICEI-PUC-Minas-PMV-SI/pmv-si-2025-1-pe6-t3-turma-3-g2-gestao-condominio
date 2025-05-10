import express from 'express';
import {
  criarVisitante,
  listarVisitantes,
  buscarVisitantePorId,
  atualizarVisitante,
  deletarVisitante,
} from '../controllers/visitanteController.js';

import { verifyToken } from '../controllers/authController.js';  
import { isAdmin } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.use(verifyToken);

router.post('/visitantes', criarVisitante);

router.get('/visitantes', async (req, res) => {
  try {
    const userId = req.userId;

    if (userId === 1) {
      return listarVisitantes(req, res);
    }

    const visitantes = await Visitante.findAll({
      where: { userId },
    });
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar visitantes', error });
  }
});

router.get('/visitantes/:id', buscarVisitantePorId);

router.put('/visitantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, documento, apartamento, dataVisita } = req.body;

  try {
    const visitante = await Visitante.findByPk(id);

    if (!visitante) {
      return res.status(404).json({ message: 'Visitante não encontrado' });
    }

    if (visitante.userId !== req.userId && req.userId !== 1) {
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
});

router.delete('/visitantes/:id', isAdmin, deletarVisitante);

export default router;
