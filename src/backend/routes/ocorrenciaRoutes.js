import express from 'express';
import { createOcorrencia, getOcorrencias, getOcorrenciaById, updateOcorrencia, deleteOcorrencia, updateOcorrenciaStatus, getOcorrenciasByUser } from '../controllers/ocorrenciaController.js';
import { verifyToken } from '../controllers/authController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ocorrencias', verifyToken, createOcorrencia);
router.get('/listar/ocorrencias', verifyToken, isAdmin, getOcorrencias);
router.get('/ocorrencias', verifyToken, getOcorrenciasByUser);
router.get('/ocorrencias/:id', verifyToken, getOcorrenciaById);
router.put('/ocorrencias/:id', verifyToken, updateOcorrencia);
router.put('/ocorrencias/status/:id', verifyToken, isAdmin, updateOcorrenciaStatus);
router.delete('/ocorrencias/:id', verifyToken, deleteOcorrencia);

export default router;