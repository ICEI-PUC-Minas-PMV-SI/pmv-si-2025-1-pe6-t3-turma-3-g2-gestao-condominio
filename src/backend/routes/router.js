// routes/router.js
import express from 'express';
import ocorrenciaRoutes from './ocorrenciaRoutes.js';
import reservaRoutes from './reservaRoutes.js';  

const router = express.Router();

router.use(ocorrenciaRoutes);
router.use(reservaRoutes);  

export default router;
