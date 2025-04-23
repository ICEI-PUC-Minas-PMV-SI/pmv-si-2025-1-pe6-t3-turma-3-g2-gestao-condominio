import React from 'react';
import '../styles/modaldetalhes.css';
import { FaTimes } from 'react-icons/fa';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  descricao: string;
};

const ModalDetalhes: React.FC<ModalProps> = ({ isOpen, onClose, titulo, descricao }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Detalhes da Ocorrência</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </div>
  );
};

export default ModalDetalhes;