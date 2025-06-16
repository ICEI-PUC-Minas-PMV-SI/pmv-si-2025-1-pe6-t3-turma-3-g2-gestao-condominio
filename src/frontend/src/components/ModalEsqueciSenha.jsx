import React, { useState } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';


const ModalEsqueciSenha = ({ isOpen, onClose, onReset }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

 const handleReset = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('E-mail inválido');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });

    console.log('Token recebido do backend:', response.data.token); // ✅ Verifique se o token está chegando

    if (response.data.token) {
      localStorage.setItem('resetToken', response.data.token); // ✅ Salve o token corretamente
    } else {
      setError('Erro ao receber token de redefinição.');
      return;
    }

    setResetLinkSent(true);
  } catch (err) {
    setError('Erro ao enviar link de redefinição.');
  }
};





  const handleChangePassword = async () => {
  if (!newPassword) {
    setError('A nova senha não pode estar vazia');
    return;
  }

  const token = localStorage.getItem('resetToken'); // ✅ Pegue o token salvo no localStorage

  console.log('Token recuperado do localStorage:', token); // ✅ Confirme que ele está sendo recuperado corretamente

  if (!token) {
    setError('Token não encontrado. Tente novamente.');
    return;
  }

  try {
    await axios.put('http://localhost:3000/api/auth/reset-password', {
      token,
      newPassword,
    });

    setPasswordChanged(true);
  } catch (err) {
    console.error('Erro ao alterar senha:', err.response?.data || err);
    setError('Erro ao alterar senha');
  }
};





  if (!isOpen) return null;

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>{resetLinkSent ? 'Alterar Senha' : 'Redefinir Senha'}</h2>
          <button className="button-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="form-modal">
          {!resetLinkSent ? (
            <>
              <input
                className="input-modal"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button className="button-create" onClick={handleReset}>
                Enviar Link de Redefinição
              </button>
            </>
          ) : passwordChanged ? (
            <div>
              <p style={{ color: 'green' }}>Senha alterada com sucesso!</p>
              <button className="button-create" onClick={onClose}>
                Fechar
              </button>
            </div>
          ) : (
            <>
              <p style={{ color: 'green' }}>
                O link para redefinir a senha foi enviado para o e-mail informado.
              </p>
              <input
                className="input-modal"
                type="password"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button className="button-create" onClick={handleChangePassword}>
                Alterar Senha
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalEsqueciSenha;
