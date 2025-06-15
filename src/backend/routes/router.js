import express from 'express';
import ocorrenciaRoutes from './ocorrenciaRoutes.js';
import reservaRoutes from './reservaRoutes.js';  
import authRoutes from './authRoutes.js';
import moradorRoutes from './moradorRoutes.js';
import visitanteRoutes from './visitanteRoutes.js';

const router = express.Router();

router.use('/ocorrencias', ocorrenciaRoutes);
router.use('/reservas', reservaRoutes);  
router.use('/auth', authRoutes);
router.use('/moradores', moradorRoutes);
router.use('/visitantes', visitanteRoutes); 

export default router;
