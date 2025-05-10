import React, { useState, useEffect } from 'react';
import '../styles/datatable.css';
import { DataTable } from '../components/DataTable';
import { FaEdit, FaTimes, FaInfoCircle } from 'react-icons/fa';
import ModalDetalhes from '../components/ModalDetalhes';
import ModalCriacaoVisitantes from '../components/ModalCriacaoVisitantes';
import ModalConfirmacao from '../components/ModalConfirmacao';
import ModalEdicaoVisitantes from '../components/ModalEdicaoVisitantes';
import {
  getVisitantes,
  createVisitante,
  updateVisitante,
  cancelarVisitante,
} from '../services/visitantesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import { jwtDecode } from 'jwt-decode';

const TelaVisitantes = () => {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVisitante, setSelectedVisitante] = useState(null);
  const [modalConfirmacaoOpen, setModalConfirmacaoOpen] = useState(false);
  const [modalCriacaoOpen, setModalCriacaoOpen] = useState(false);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchVisitantes = async () => {
      try {
        const visitantes = await getVisitantes();
        setDados(visitantes);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchVisitantes();

    // Verifica se o usuário é admin com base no token
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded?.id === 1); // ajuste aqui se tiver um campo como isAdmin
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }
  }, []);

  const handleOpenModal = (visitante) => {
    setSelectedVisitante(visitante);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVisitante(null);
  };

  const handleOpenConfirmacao = (visitante) => {
    setSelectedVisitante(visitante);
    setModalConfirmacaoOpen(true);
  };

  const handleConfirmacao = async () => {
    try {
      await cancelarVisitante(selectedVisitante.id);
      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === selectedVisitante.id ? { ...item, documento: 'cancelado' } : item
        )
      );
      setModalConfirmacaoOpen(false);
      setSelectedVisitante(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateVisitante = async (nome, apartamento, data, documento) => {
    try {
      const novoVisitante = await createVisitante(nome, apartamento, data, documento);
      setDados((prevDados) => [...prevDados, novoVisitante]);
      setModalCriacaoOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditVisitante = async (nome, apartamento, data, documento) => {
    if (selectedVisitante) {
      try {
        const dadosAtualizados = {
          nome,
          apartamento,
          data,
          documento, // Alterado para 'documento'
        };

        const visitanteAtualizado = await updateVisitante(
          selectedVisitante.id,
          dadosAtualizados
        );

        setDados((prevDados) =>
          prevDados.map((item) =>
            item.id === selectedVisitante.id ? visitanteAtualizado : item
          )
        );
        setModalEdicaoOpen(false);
        setSelectedVisitante(null);
      } catch (error) {
        console.error('Erro ao atualizar visitante:', error.message);
      }
    }
  };

  const handleOpenEdicao = (visitante) => {
    if (visitante.documento !== 'Ativo') {  // Alterado para 'documento'
      toast.warning(
        'Não é possível editar um visitante que não está com documento ativo.'
      );
      return;
    }
    setSelectedVisitante(visitante);
    setModalEdicaoOpen(true);
  };

  const colunas = [
    { header: 'NOME', accessor: 'nome' },
    { header: 'DOCUMENTO', accessor: 'documento' },  // Alterado para 'documento'
    { header: 'APARTAMENTO', accessor: 'apartamento' },  // Alterado para 'apartamento'
    { header: 'DATA', accessor: 'data' },
    {
      header: 'AÇÕES',
      render: (item) => (
        <>
          <button onClick={() => handleOpenModal(item)} title="Info">
            <FaInfoCircle />
          </button>
          <button onClick={() => handleOpenEdicao(item)} title="Editar">
            <FaEdit />
          </button>
          <button onClick={() => handleOpenConfirmacao(item)} title="Cancelar">
            <FaTimes />
          </button>
        </>
      ),
    },
  ];

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
        <h1>LISTAGEM DE VISITANTES</h1>
        {!isAdmin && (
          <button
            className="criar-ocorrencia-btn"
            onClick={() => setModalCriacaoOpen(true)}
          >
            CRIAR VISITANTE
          </button>
        )}
      </div>
      <DataTable data={dados} columns={colunas} />
      <ModalCriacaoVisitantes
        isOpen={modalCriacaoOpen}
        onClose={() => setModalCriacaoOpen(false)}
        onCreate={handleCreateVisitante}
      />
      <ModalEdicaoVisitantes
        isOpen={modalEdicaoOpen}
        onClose={() => setModalEdicaoOpen(false)}
        onEdit={handleEditVisitante}
        initialData={
          selectedVisitante || { nome: '', apartamento: '', data: '', documento: '' }
        }
      />
      {selectedVisitante && (
        <ModalDetalhes
          isOpen={modalOpen}
          onClose={handleCloseModal}
          tituloHeader="Detalhes do Visitante"
          titulo={selectedVisitante.nome}
          descricao={`Data: ${selectedVisitante.data}, Apartamento: ${selectedVisitante.apartamento}`}
        />
      )}
      <ModalConfirmacao
        isOpen={modalConfirmacaoOpen}
        onClose={() => setModalConfirmacaoOpen(false)}
        onConfirm={handleConfirmacao}
        titulo={selectedVisitante ? selectedVisitante.nome : ''}
      />
    </div>
  );
};

export default TelaVisitantes;
