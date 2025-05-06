import React, { useState, useEffect } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalEdicaoReservas = ({ isOpen, onClose, onEdit, initialData }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [status, setStatus] = useState(''); // Adicionando o status no estado

  useEffect(() => {
    if (isOpen) {
      // Preenche os campos com os dados iniciais da reserva
      setNome(initialData.nome);
      setData(initialData.data);
      setHorario(initialData.horario);
      setStatus(initialData.status); // Preserva o status
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chama a função de edição com os novos valores, incluindo o status
    onEdit(nome, data, horario, status);
    onClose(); // Fecha o modal após a edição
  };

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Editar Reserva</h2>
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
              onChange={(e) => setNome(e.target.value)}
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
          <button type="submit" className="button-create">EDITAR</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEdicaoReservas;
