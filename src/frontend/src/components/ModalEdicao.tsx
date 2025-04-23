import React, { useState, useEffect } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

type ModalEdicaoProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (titulo: string, descricao: string) => void;
  initialData: { titulo: string; descricao: string };
};

const ModalEdicao: React.FC<ModalEdicaoProps> = ({ isOpen, onClose, onEdit, initialData }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitulo(initialData.titulo);
      setDescricao(initialData.descricao);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(titulo, descricao);
    onClose();
  };

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>EDITAR OCORRÊNCIA</h2>
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
          <button type="submit" className="button-create">EDITAR</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEdicao;