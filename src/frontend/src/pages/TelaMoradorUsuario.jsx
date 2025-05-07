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
  getMoradorDoUsuario, // Changed from getMoradoresAdmin
  criarMorador,
  atualizarMorador,
  deletarMorador
} from '../services/moradoresService';

const TelaMoradoresUsuario = () => {
  const [morador, setMorador] = useState(null); // Stores a single morador object or null
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [modalCriarOpen, setModalCriarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoradorDoUsuario = async () => {
    setIsLoading(true);
    try {
      const data = await getMoradorDoUsuario();
      setMorador(data || null); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMorador(null); 
      } else {
        toast.error('Erro ao carregar dados do morador.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoradorDoUsuario();
  }, []);

  const handleCreateMorador = async (dados) => {
    try {
      await criarMorador(dados);
      toast.success('Perfil de morador criado com sucesso!');
      fetchMoradorDoUsuario(); // Refresh data
      setModalCriarOpen(false);
    } catch (error) {
      console.error("Erro ao criar morador:", error);
      toast.error(error.response?.data?.message || 'Erro ao criar perfil de morador.');
    }
  };

  const handleUpdateMorador = async (dadosAtualizados) => {
    if (!morador || !morador.id) {
      toast.error('Nenhum morador selecionado para atualizar.');
      return;
    }
    try {
      await atualizarMorador(morador.id, dadosAtualizados);
      toast.success('Perfil de morador atualizado com sucesso!');
      fetchMoradorDoUsuario(); // Refresh data
      setModalEditarOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar morador:", error);
      toast.error(error.response?.data?.message || 'Erro ao atualizar perfil de morador.');
    }
  };

  const handleDeleteMorador = async () => {
    if (!morador || !morador.id) {
      toast.error('Nenhum morador selecionado para deletar.');
      return;
    }
    try {
      await deletarMorador(morador.id);
      toast.success('Perfil de morador deletado com sucesso!');
      setMorador(null); // Clear morador from state
      setModalExcluirOpen(false);
    } catch (error) {
      console.error("Erro ao deletar morador:", error);
      toast.error(error.response?.data?.message || 'Erro ao deletar perfil de morador.');
    }
  };

  const colunas = [
    { header: 'NOME', accessor: 'nome' },
    { header: 'APARTAMENTO', accessor: 'apartamento' },
    { header: 'BLOCO', accessor: 'bloco' },
    { header: 'CONTATO', accessor: 'contato' },
    {
      header: 'AÇÕES',
      render: (item) => ( // item here will be the single 'morador' object
        <div className="acoes">
          <button onClick={() => setModalDetalhesOpen(true)}><FaInfoCircle /></button>
          <button onClick={() => setModalEditarOpen(true)}><FaEdit /></button>
          <button onClick={() => setModalExcluirOpen(true)}><FaTrash /></button>
        </div>
      )
    }
  ];

  // Data for DataTable will be an array with 0 or 1 morador
  const dataParaTabela = morador ? [morador] : [];

  if (isLoading) {
    return (
      <div className="container">
        <Sidebar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando dados do morador...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Sidebar />
      <ToastContainer
        position="bottom-right"
        toastStyle={{
          fontSize: '18px',
          width: '400px',
          padding: '20px',
        }}
      />
      <div className="header">
        <h1>Meu Perfil de Morador</h1>
        {!morador && ( // Only show create button if no morador profile exists
          <button className="button-create" onClick={() => setModalCriarOpen(true)}>
            <FaPlus /> Criar Perfil de Morador
          </button>
        )}
      </div>

      {morador ? (
        <DataTable data={dataParaTabela} columns={colunas} />
      ) : (
        !isLoading && <p>Você ainda não possui um perfil de morador cadastrado.</p>
      )}

      {morador && (
        <>
          <ModalDetalhesMorador
            isOpen={modalDetalhesOpen}
            onClose={() => setModalDetalhesOpen(false)}
            morador={morador}
          />
          <ModalEditarMorador
            isOpen={modalEditarOpen}
            onClose={() => setModalEditarOpen(false)}
            morador={morador} // Pass the current morador data for pre-filling the form
            onUpdate={handleUpdateMorador}
          />
          <ModalConfirmacao
            isOpen={modalExcluirOpen}
            onClose={() => setModalExcluirOpen(false)}
            onConfirm={handleDeleteMorador}
            titulo={`o perfil de morador de ${morador.nome}`}
            mensagem="Tem certeza que deseja excluir seu perfil de morador? Esta ação não poderá ser desfeita."
          />
        </>
      )}

      <ModalCriarMorador
        isOpen={modalCriarOpen}
        onClose={() => setModalCriarOpen(false)}
        onCreate={handleCreateMorador}
      />
    </div>
  );
};

export default TelaMoradoresUsuario;