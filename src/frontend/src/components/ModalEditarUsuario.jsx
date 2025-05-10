import React, { useState, useEffect } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalEditarUsuario = ({ isOpen, onClose, usuario, onUpdate }) => {
  const [form, setForm] = useState({ id: '', name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (usuario) {
      setForm({ id: usuario.id, name: usuario.name, email: usuario.email });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Limpa o erro ao digitar
  };

  const handleSubmit = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('E-mail inválido');
      return;
    }
    
    // Validação simples
    if (!form.name || !form.email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Passa os dados atualizados para a função onUpdate
    onUpdate(form);
    onClose(); // Fecha o modal após a atualização
  };

  if (!isOpen) return null;

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Editar Usuário</h2>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="button-create" onClick={handleSubmit}>Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarUsuario;
