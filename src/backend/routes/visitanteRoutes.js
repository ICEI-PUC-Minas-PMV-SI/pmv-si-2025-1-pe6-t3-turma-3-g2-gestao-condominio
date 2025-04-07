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

// Rotas
router.post('/visitantes', criarVisitante); 
router.get('/visitantes', isAdmin, listarVisitantes); 
router.get('/visitantes/:id', buscarVisitantePorId); 
router.put('/visitantes/:id', atualizarVisitante); 
router.delete('/visitantes/:id', isAdmin, deletarVisitante); 

export default router;
