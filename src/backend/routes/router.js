// routes/router.js
import express from 'express';
import ocorrenciaRoutes from './ocorrenciaRoutes.js';
import reservaRoutes from './reservaRoutes.js';  
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use(ocorrenciaRoutes);
router.use(reservaRoutes);  
router.use(authRoutes);

export default router;
