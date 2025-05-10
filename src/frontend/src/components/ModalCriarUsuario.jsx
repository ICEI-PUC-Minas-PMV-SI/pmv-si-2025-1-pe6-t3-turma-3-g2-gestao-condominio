import React, { useState } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalCriarUsuario = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Limpa o erro ao digitar
  };

  const handleSubmit = () => {
    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('E-mail inválido');
      return;
    }

    onCreate(form);
    onClose();
    setForm({ name: '', email: '', password: '' });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Criar Usuário</h2>
          <button className="button-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="form-modal">
          <input
            className="input-modal"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
          />
          <input
            className="input-modal"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="input-modal"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Senha"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="button-create" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCriarUsuario;
