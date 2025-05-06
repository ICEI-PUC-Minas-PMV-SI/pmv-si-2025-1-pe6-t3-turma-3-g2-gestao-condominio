// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

// Registro de usuário
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'E-mail já cadastrado' });

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Login de usuário
export const login = async (req, res) => {
    console.log(' RECEBEU LOGIN:', req.body);  // ← Coloque aqui
    try {
        const { email, password } = req.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Senha incorreta' });

        // Gerar Token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};

// Verificação de Token (Proteção de Rotas)
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'Acesso negado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.userId = decoded.id;
        next();
    });
};
