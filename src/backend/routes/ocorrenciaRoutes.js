// routes/ocorrenciaRoutes.js
import express from 'express';
import { createOcorrencia, getOcorrencias, getOcorrenciaById, updateOcorrencia, deleteOcorrencia } from '../controllers/ocorrenciaController.js';

const router = express.Router();

router.post('/ocorrencias', createOcorrencia);
router.get('/ocorrencias', getOcorrencias);
router.get('/ocorrencias/:id', getOcorrenciaById);
router.put('/ocorrencias/:id', updateOcorrencia);
router.delete('/ocorrencias/:id', deleteOcorrencia);

export default router;