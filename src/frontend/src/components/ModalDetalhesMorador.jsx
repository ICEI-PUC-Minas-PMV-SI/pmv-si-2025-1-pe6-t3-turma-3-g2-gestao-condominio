import React from 'react';
import '../styles/modaldetalhes.css';
import { FaTimes } from 'react-icons/fa';

const ModalDetalhesMorador = ({ isOpen, onClose, morador }) => {
  if (!isOpen || !morador) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Detalhes do Morador</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <h3>{morador.nome}</h3>
        <p><strong>Apartamento:</strong> {morador.apartamento}</p>
        <p><strong>Bloco:</strong> {morador.bloco}</p>
        <p><strong>Contato:</strong> {morador.contato}</p>
        <p><strong>Email:</strong> {morador.User?.email || 'Não vinculado'}</p>
      </div>
    </div>
  );
};

export default ModalDetalhesMorador;