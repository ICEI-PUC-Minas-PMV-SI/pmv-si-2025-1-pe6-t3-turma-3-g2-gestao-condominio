import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTable } from '../components/DataTable';
import { FaInfoCircle, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ModalDetalhesMorador from '../components/ModalDetalhesMorador';
import ModalCriarMorador from '../components/ModalCriarMorador';
import ModalEditarMorador from '../components/ModalEditarMorador';
import ModalConfirmacao from '../components/ModalConfirmacao';
import {
  getMoradoresAdmin,
  criarMorador,
  atualizarMorador,
  deletarMorador
} from '../services/moradoresService';

const TelaMoradoresAdmin = () => {
  const [moradores, setMoradores] = useState([]);
  const [moradorSelecionado, setMoradorSelecionado] = useState(null);
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [modalCriarOpen, setModalCriarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);

  const fetchMoradores = async () => {
    try {
      const data = await getMoradoresAdmin();
      setMoradores(data);
    } catch {
      toast.error('Erro ao carregar moradores');
    }
  };

  useEffect(() => {
    fetchMoradores();
  }, []);

  const handleCreateMorador = async (dados) => {
    try {
      await criarMorador(dados);
      toast.success('Morador criado com sucesso');
      fetchMoradores();
    } catch {
      toast.error('Erro ao criar morador');
    }
  };

  const handleUpdateMorador = async (dados) => {
    try {
      await atualizarMorador(dados.id, dados);
      toast.success('Morador atualizado');
      fetchMoradores();
    } catch {
      toast.error('Erro ao atualizar morador');
    }
  };

  const handleDeleteMorador = async (id) => {
    try {
      await deletarMorador(id);
      toast.success('Morador deletado');
      setModalExcluirOpen(false);
      fetchMoradores();
    } catch {
      toast.error('Erro ao deletar');
    }
  };

  const colunas = [
    { header: 'NOME', accessor: 'nome' },
    { header: 'APARTAMENTO', accessor: 'apartamento' },
    { header: 'BLOCO', accessor: 'bloco' },
    { header: 'CONTATO', accessor: 'contato' },
    {
      header: 'AÇÕES',
      render: (item) => (
        <div className="acoes">
          <button onClick={() => { setMoradorSelecionado(item); setModalDetalhesOpen(true); }}><FaInfoCircle /></button>
          <button onClick={() => { setMoradorSelecionado(item); setModalEditarOpen(true); }}><FaEdit /></button>
          <button onClick={() => { setMoradorSelecionado(item); setModalExcluirOpen(true); }}><FaTrash /></button>
        </div>
      )
    }
  ];

  return (
    <div className="container">
      <Sidebar />
      <ToastContainer />
      <div className="header">
        <h1>Moradores</h1>
        <button className="button-create" onClick={() => setModalCriarOpen(true)}>
          <FaPlus /> Criar Morador
        </button>
      </div>
      <DataTable data={moradores} columns={colunas} />

      <ModalDetalhesMorador
        isOpen={modalDetalhesOpen}
        onClose={() => setModalDetalhesOpen(false)}
        morador={moradorSelecionado}
      />

      <ModalCriarMorador
        isOpen={modalCriarOpen}
        onClose={() => setModalCriarOpen(false)}
        onCreate={handleCreateMorador}
      />

      <ModalEditarMorador
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        morador={moradorSelecionado}
        onUpdate={handleUpdateMorador}
      />

      <ModalConfirmacao
        isOpen={modalExcluirOpen}
        onClose={() => setModalExcluirOpen(false)}
        onConfirm={() => handleDeleteMorador(moradorSelecionado?.id)}
        titulo={moradorSelecionado?.nome}
      />
    </div>
  );
};

export default TelaMoradoresAdmin;