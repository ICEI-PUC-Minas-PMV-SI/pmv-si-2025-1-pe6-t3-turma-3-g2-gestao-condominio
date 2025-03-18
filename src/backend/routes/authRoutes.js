// routes/authRoutes.js
import express from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Rotas de autenticação
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/verify', verifyToken, (req, res) => {
    res.json({ message: 'Token válido', userId: req.userId });
});

export default router;
