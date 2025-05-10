import React, { useState, useEffect } from 'react';
import '../styles/datatable.css';
import { DataTable } from '../components/DataTable';
import { FaEdit, FaTimes, FaInfoCircle } from 'react-icons/fa';
import ModalCriacaoVisitantes from '../components/ModalCriacaoVisitantes';
import ModalConfirmacao from '../components/ModalConfirmacao';
import ModalEdicaoVisitantes from '../components/ModalEdicaoVisitantes';
import ModalDetalhes from '../components/ModalDetalhes';
import Sidebar from '../components/Sidebar';
import {
  getVisitantes,
  createVisitante,
  updateVisitante,
  cancelarVisitante,
} from '../services/visitantesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded?.id === 1);
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
      setDados((prev) =>
        prev.filter((item) => item.id !== selectedVisitante.id)
      );
      setModalConfirmacaoOpen(false);
      setSelectedVisitante(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateVisitante = async ({ nome, apartamento, data, documento }) => {
    try {
      const novo = await createVisitante({ nome, apartamento, dataVisita: data, documento });
      setDados((prev) => [...prev, novo]);
      setModalCriacaoOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditVisitante = async ({ nome, apartamento, data, documento }) => {
    try {
      const atualizado = await updateVisitante(selectedVisitante.id, {
        nome,
        apartamento,
        dataVisita: data,
        documento,
      });
      setDados((prev) =>
        prev.map((item) => (item.id === atualizado.id ? atualizado : item))
      );
      setModalEdicaoOpen(false);
      setSelectedVisitante(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleOpenEdicao = (visitante) => {
    setSelectedVisitante(visitante);
    setModalEdicaoOpen(true);
  };

  const colunas = [
    { header: 'NOME', accessor: 'nome' },
    { header: 'DOCUMENTO', accessor: 'documento' },
    { header: 'APARTAMENTO', accessor: 'apartamento' },
    { header: 'DATA', accessor: 'dataVisita' },
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
      <ToastContainer position="bottom-right" />
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
          selectedVisitante || {
            nome: '',
            apartamento: '',
            data: '',
            documento: '',
          }
        }
      />
      {selectedVisitante && (
        <ModalDetalhes
          isOpen={modalOpen}
          onClose={handleCloseModal}
          tituloHeader="Detalhes do Visitante"
          titulo={selectedVisitante.nome}
          descricao={`Data: ${selectedVisitante.dataVisita}, Apartamento: ${selectedVisitante.apartamento}, Documento: ${selectedVisitante.documento}`}
        />
      )}
      <ModalConfirmacao
        isOpen={modalConfirmacaoOpen}
        onClose={() => setModalConfirmacaoOpen(false)}
        onConfirm={handleConfirmacao}
        titulo={selectedVisitante?.nome || ''}
      />
    </div>
  );
};

export default TelaVisitantes;
