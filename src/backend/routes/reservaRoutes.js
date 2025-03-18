// routes/reservaRoutes.js
import express from 'express';
import { criarReserva, listarReservas, buscarReserva, atualizarReserva, cancelarReserva, historicoReservas } from '../controllers/reservaController.js';

const router = express.Router();

router.post('/reserva', criarReserva);
router.get('/reserva', listarReservas);
router.get('/reserva/:id', buscarReserva);
router.put('/reserva/:id', atualizarReserva);
router.delete('/reserva/:id', cancelarReserva);
router.get('/historico', historicoReservas);

export default router;
