import React, { useState } from 'react';
import '../styles/modalcriacao.css';
import { FaTimes } from 'react-icons/fa';

const ModalCriacaoVisitantes = ({ isOpen, onClose, onCreate }) => {
  const [apartamento, setApartamento] = useState('');  // Alterado para 'apartamento'
  const [nome, setNome] = useState('');  // Novo campo para 'nome'
  const [data, setData] = useState('');
  const [documento, setDocumento] = useState('');  // Novo campo para 'documento'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ nome, apartamento, data, documento, status: 'ativo' });  // Incluindo 'documento' no objeto
    setNome('');  // Limpar o campo 'nome'
    setApartamento('');  // Limpar o campo 'apartamento'
    setData('');
    setDocumento('');  // Limpar o campo 'documento'
    onClose();
  };

  return (
    <div className="overlay-modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>Criar Visitante</h2>
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
              value={nome}  // Novo campo 'nome'
              onChange={(e) => setNome(e.target.value)}  // Atualiza o estado do 'nome'
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
              onChange={(e) => setDocumento(e.target.value)}  // Atualiza o estado do 'documento'
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
              onChange={(e) => setApartamento(e.target.value)}  // Alterado para 'setApartamento'
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

          <button type="submit" className="button-create">CRIAR</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCriacaoVisitantes;
