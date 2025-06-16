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

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll({ attributes: ['id', 'name', 'email'] }); // Evita retornar senhas
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
};

// Atualização de usuário
export const atualizarUsuario = async (req, res) => {
    const { id } = req.params;  // Pega o ID do usuário que será atualizado
    const { name, email, password } = req.body;  // Dados que serão atualizados

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o email já está em uso por outro usuário
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'E-mail já cadastrado' });
            }
        }

        // Atualiza os dados do usuário
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();  // Salva as alterações no banco de dados

        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
};

export const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    console.log('🔎 Tentativa de excluir usuário ID:', id, 'por usuário autenticado ID:', req.userId); // 🛠 Depuração

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            console.log('🚫 Usuário não encontrado!');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // 🔥 Verifica se o usuário tem permissão
        if (req.userId !== 1) {
            console.log('⛔ Permissão negada! O usuário autenticado não é administrador.');
            return res.status(403).json({ message: 'Permissão negada' });
        }

        await user.destroy();
        console.log('✅ Usuário ID', id, 'deletado com sucesso!');
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('❌ Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: 'Se o e-mail existir, enviaremos instruções para redefinir a senha.' });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Enviar o token por e-mail (pode usar o Nodemailer aqui)
    console.log(`Token de redefinição para ${email}: ${resetToken}`);

    res.status(200).json({ 
      message: 'Instruções de redefinição enviadas para o e-mail.', 
      token: resetToken // ✅ Agora retorna o token corretamente!
    });
  } catch (error) {
    console.error('Erro ao processar solicitação de redefinição:', error);
    res.status(500).json({ message: 'Erro ao processar solicitação de redefinição de senha', error });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log('Token recebido:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro ao atualizar a senha', error });
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
        console.log('✅ Token gerado:', token);

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};

export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization']; // ✅ Pegando do cabeçalho da requisição

    console.log('🔥 Token recebido na API:', token);  // 🛠 Depuração

    if (!token) {
        console.log('🚫 Nenhum token foi enviado!');
        return res.status(401).json({ message: 'Acesso negado' });
    }

    // 🔥 Remove "Bearer " se ele estiver presente
    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    console.log('🔍 Token processado:', token);  // 🛠 Depuração

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('⚠️ Token inválido!', err);
            return res.status(403).json({ message: 'Token inválido' });
        }

        console.log('✅ Usuário autenticado com ID:', decoded.id);
        req.userId = decoded.id;
        next();
    });
};






