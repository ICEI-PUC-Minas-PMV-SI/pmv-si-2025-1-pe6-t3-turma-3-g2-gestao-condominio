import React from 'react';
import '../styles/modalconfirmacao.css';

type ModalConfirmacaoProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
};

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-confirm">
      <div className="modal-content-confirm">
        <h2 className='modal-title-confirm'>Confirmar Exclusão</h2>
        <p className='modal-desc-confirm'>Você tem certeza que deseja excluir "{titulo}"?</p>
        <button className="btn-confirm" onClick={onConfirm}>Confirmar</button>
        <button className="btn-delete" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalConfirmacao;