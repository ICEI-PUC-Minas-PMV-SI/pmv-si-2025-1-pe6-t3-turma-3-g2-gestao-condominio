import express from 'express';
import {
  criarVisitante,
  listarVisitantes,
  listarVisitantesUsuario,
  buscarVisitantePorId,
  atualizarVisitante,
  deletarVisitante,
} from '../controllers/visitanteController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(verifyToken);

// Rota para criar visitante
router.post('/', criarVisitante);

// Listar todos (somente admin no controller)
router.get('/', listarVisitantes);

// Listar apenas visitantes do usuário autenticado
router.get('/usuario', listarVisitantesUsuario);

// Buscar visitante por ID (com validação no controller)
router.get('/:id', buscarVisitantePorId);

// Atualizar visitante
router.put('/:id', atualizarVisitante);

// Deletar visitante
router.delete('/:id', deletarVisitante);

export default router;
