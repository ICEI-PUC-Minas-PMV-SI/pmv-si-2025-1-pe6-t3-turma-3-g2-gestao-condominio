import React, { useState, useEffect } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalEdicaoVisitantes = ({ isOpen, onClose, onEdit, initialData }) => {
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNome(initialData?.nome || '');
      setDocumento(initialData?.documento || '');
      setApartamento(initialData?.apartamento || '');
      setData(initialData?.dataVisita || '');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ nome, documento, apartamento, data });
    onClose();
  };

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Editar Visitante</h2>
          <button className="button-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form-modal">
          <label className="label-modal">
            NOME
            <input
              type="text"
              className="input-modal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
          <label className="label-modal">
            DOCUMENTO
            <input
              type="text"
              className="input-modal"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
              disabled
            />
          </label>
          <label className="label-modal">
            APARTAMENTO
            <input
              type="text"
              className="input-modal"
              value={apartamento}
              onChange={(e) => setApartamento(e.target.value)}
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
          <button type="submit" className="button-create">EDITAR</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEdicaoVisitantes;
