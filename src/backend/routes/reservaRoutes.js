import express from 'express';
import { criarReserva, listarReservas, buscarReserva, atualizarReserva, cancelarReserva, historicoReservas,listarReservasUser, atualizarReservaAdmin } from '../controllers/reservaController.js';
import { verifyToken } from '../controllers/authController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reservas', verifyToken, criarReserva);
router.get('/reservas', verifyToken, isAdmin, listarReservas);
router.get('/listar/reservas', verifyToken, listarReservasUser);
router.get('/reservas/:id', verifyToken, buscarReserva);
router.put('/reservas/:id', verifyToken, atualizarReserva);
router.put('/admin/reservas/:id', verifyToken, atualizarReservaAdmin);
router.delete('/reservas/:id', verifyToken, cancelarReserva);
router.get('/historico', verifyToken, historicoReservas);

export default router;
