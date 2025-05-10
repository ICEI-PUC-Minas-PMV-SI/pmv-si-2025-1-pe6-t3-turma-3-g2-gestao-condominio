import React, { useState, useEffect } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalEdicaoVisitantes = ({ isOpen, onClose, onEdit, initialData }) => {
  const [apartamento, setApartamento] = useState('');  // Alterado para 'apartamento'
  const [nome, setNome] = useState('');  // Alterado para 'nome'
  const [data, setData] = useState('');
  const [documento, setDocumento] = useState('');  // Alterado para 'documento'

  useEffect(() => {
    if (isOpen) {
      setNome(initialData.nome);  // Alterado para 'nome'
      setApartamento(initialData.apartamento);  // Alterado para 'apartamento'
      setData(initialData.data);
      setDocumento(initialData.documento);  // Alterado para 'documento'
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(nome, apartamento, data, documento);  // Alterado para 'nome', 'apartamento', 'documento'
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
              value={nome}  // Alterado para 'nome'
              onChange={(e) => setNome(e.target.value)}  // Atualiza o estado de 'nome'
              required
              placeholder="Digite o nome do visitante"
            />
          </label>

          <label className="label-modal">
            DOCUMENTO
            <input
              type="text"
              className="input-modal"
              value={documento}  // Alterado para 'documento'
              onChange={(e) => setDocumento(e.target.value)}  // Atualiza o estado de 'documento'
              required
              placeholder="Digite o número do documento"
            />
          </label>

          <label className="label-modal">
            APARTAMENTO
            <input
              type="text"
              className="input-modal"
              value={apartamento}  // Alterado para 'apartamento'
              onChange={(e) => setApartamento(e.target.value)}  // Atualiza o estado de 'apartamento'
              required
              placeholder="Digite o número do apartamento"
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
