// routes/router.js
import express from 'express';
import ocorrenciaRoutes from './ocorrenciaRoutes.js';

const router = express.Router();

router.use(ocorrenciaRoutes);

export default router;
