import React, { useState } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalCriarMorador = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({ nome: '', apartamento: '', bloco: '', contato: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate(form);
    onClose();
    setForm({ nome: '', apartamento: '', bloco: '', contato: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Criar Morador</h2>
          <button className="button-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="form-modal">
          <div className="form-group">
            <label className="label-modal">Nome</label>
            <input className="input-modal" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
          </div>
          <div className="form-group">
            <label className="label-modal">Apartamento</label>
            <input className="input-modal" name="apartamento" value={form.apartamento} onChange={handleChange} placeholder="Apartamento" />
          </div>
          <div className="form-group">
            <label className="label-modal">Bloco</label>
            <input className="input-modal" name="bloco" value={form.bloco} onChange={handleChange} placeholder="Bloco" />
          </div>
          <div className="form-group">
            <label className="label-modal">Contato</label>
            <input className="input-modal" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato" />
          </div>
          <button className="button-create" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCriarMorador;