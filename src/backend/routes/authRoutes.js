// routes/authRoutes.js
import express from 'express';
import { register, login, verifyToken, listarUsuarios, atualizarUsuario, deletarUsuario   } from '../controllers/authController.js';

const router = express.Router();

// Rotas de autenticação
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/usuarios', listarUsuarios);
router.put('/usuarios/:id', verifyToken, atualizarUsuario);
router.delete('/usuarios/:id', verifyToken, deletarUsuario);
router.get('/auth/verify', verifyToken, (req, res) => {
    res.json({ message: 'Token válido', userId: req.userId });
});

export default router;
