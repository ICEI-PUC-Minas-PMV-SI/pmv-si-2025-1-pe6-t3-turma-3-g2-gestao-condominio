import React, { useState } from 'react';
import '../styles/modalcriacao.css'; // Certifique-se de que o caminho está correto
import { FaTimes } from 'react-icons/fa';

const ModalCriacao = ({ isOpen, onClose, onCreate }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(titulo, descricao);
    setTitulo('');
    setDescricao('');
    onClose();
  };

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Criar Ocorrência</h2>
          <button className="button-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form-modal">
          <label className="label-modal">
            TÍTULO
            <input 
              type="text" 
              className="input-modal" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              required 
            />
          </label>
          <label className="label-modal">
            DESCRIÇÃO
            <textarea 
              className="textarea-modal"
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              required 
            />
          </label>
          <button type="submit" className="button-create">CRIAR</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCriacao;