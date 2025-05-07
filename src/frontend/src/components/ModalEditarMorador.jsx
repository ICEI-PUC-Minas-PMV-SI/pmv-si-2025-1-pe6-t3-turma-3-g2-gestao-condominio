import React, { useState, useEffect } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalEditarMorador = ({ isOpen, onClose, morador, onUpdate }) => {
  const [form, setForm] = useState({ nome: '', apartamento: '', bloco: '', contato: '' });

  useEffect(() => {
    if (morador) setForm(morador);
  }, [morador]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(form);
    onClose();
  };

  if (!isOpen || !morador) return null;

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Editar Morador</h2>
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

export default ModalEditarMorador;