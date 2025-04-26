import React, { useState } from 'react';
import '../styles/modalstatus.css'; // Novo arquivo de estilo
import { FaTimes } from 'react-icons/fa';

const ModalEditarStatus = ({ isOpen, onClose, onSave, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(status);
    setStatus('');
    onClose();
  };

  return (
    <div className="modal-overlay-edit-status">
      <div className="modal-content-edit-status">
        <div className="modal-header-edit-status">
          <h2>Editar Status</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form-edit-status">
          <label className="modal-label-edit-status">
            Status
            <select
              className="modal-select-edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Selecione o status</option>
              <option value="aberto">Aberto</option>
              <option value="em andamento">Em Andamento</option>
              <option value="fechado">Fechado</option>
            </select>
          </label>
          <button type="submit" className="modal-btn-save-status">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarStatus;