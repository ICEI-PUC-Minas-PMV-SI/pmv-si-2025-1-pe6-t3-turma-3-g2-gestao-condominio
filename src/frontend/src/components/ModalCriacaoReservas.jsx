import React, { useState } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalCriacaoReservas = ({ isOpen, onClose, onCreate }) => {
  const [nome, setLocal] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({nome, data, horario, status: 'ativo'} );
    setLocal('');
    setData('');
    setHorario('');
    onClose();
  };

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Criar Reserva</h2>
          <button className="button-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form-modal">
          <label className="label-modal">
            LOCAL
            <input 
              type="text" 
              className="input-modal" 
              value={nome} 
              onChange={(e) => setLocal(e.target.value)} 
              required 
            />
          </label>
          <label className="label-modal">
            DATA
            <input 
              type="date" 
              className="input-modal" 
              value={data} 
              onChange={(e) => setData(e.target.value)} 
              required 
            />
          </label>
          <label className="label-modal">
            HORÁRIO
            <input 
              type="time" 
              className="input-modal" 
              value={horario} 
              onChange={(e) => setHorario(e.target.value)} 
              required 
            />
          </label>
          <button type="submit" className="button-create">CRIAR</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCriacaoReservas;
