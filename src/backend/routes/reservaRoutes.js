import express from 'express';
import { criarReserva, listarReservas, buscarReserva, atualizarReserva, cancelarReserva, historicoReservas } from '../controllers/reservaController.js';
import { verifyToken } from '../controllers/authController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reserva', verifyToken, criarReserva);
router.get('/reservas', verifyToken, isAdmin, listarReservas);
router.get('/reserva/:id', verifyToken, buscarReserva);
router.put('/reserva/:id', verifyToken, atualizarReserva);
router.delete('/reserva/:id', verifyToken, cancelarReserva);
router.get('/historico', verifyToken, historicoReservas);

export default router;
