import express from 'express';
import ocorrenciaRoutes from './ocorrenciaRoutes.js';
import reservaRoutes from './reservaRoutes.js';  
import authRoutes from './authRoutes.js';
import moradorRoutes from './moradorRoutes.js';
import visitanteRoutes from './visitanteRoutes.js';

const router = express.Router();

router.use(ocorrenciaRoutes);
router.use(reservaRoutes);  
router.use(authRoutes);
router.use('/moradores', moradorRoutes);
router.use(visitanteRoutes); // Corrigido

export default router;
