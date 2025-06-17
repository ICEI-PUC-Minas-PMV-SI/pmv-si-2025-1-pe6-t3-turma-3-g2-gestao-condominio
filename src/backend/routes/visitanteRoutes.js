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
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/visitantes', criarVisitante);

router.get('/visitantes', isAdmin, listarVisitantes);
router.get('/listar/visitantes', listarVisitantesUsuario);

router.get('/visitantes/:id', buscarVisitantePorId);

router.put('/visitantes/:id', atualizarVisitante);
router.put('/admin/visitantes/:id', isAdmin, atualizarVisitante);

router.delete('/visitantes/:id', deletarVisitante);
router.delete('/admin/visitantes/:id', isAdmin, deletarVisitante);

export default router;
