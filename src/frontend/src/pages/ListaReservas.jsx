import React, { useState, useEffect } from 'react';
import '../styles/datatable.css';
import { DataTable } from '../components/DataTable';
import { FaEdit, FaTimes, FaInfoCircle } from 'react-icons/fa';
import ModalDetalhes from '../components/ModalDetalhes';
import ModalCriacaoReservas from '../components/ModalCriacaoReservas';
import ModalConfirmacao from '../components/ModalConfirmacao';
import ModalEdicaoReservas from '../components/ModalEdicaoReservas';
import {
  getReservas,
  createReserva,
  updateReserva,
  cancelarReserva,
} from '../services/reservasService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import {jwtDecode} from 'jwt-decode';

const TelaReservas = () => {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [modalConfirmacaoOpen, setModalConfirmacaoOpen] = useState(false);
  const [modalCriacaoOpen, setModalCriacaoOpen] = useState(false);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const reservas = await getReservas();
        setDados(reservas);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReservas();

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

  const handleOpenModal = (reserva) => {
    setSelectedReserva(reserva);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReserva(null);
  };

  const handleOpenConfirmacao = (reserva) => {
    setSelectedReserva(reserva);
    setModalConfirmacaoOpen(true);
  };

  const handleConfirmacao = async () => {
    try {
      await cancelarReserva(selectedReserva.id);
      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === selectedReserva.id ? { ...item, status: 'cancelado' } : item
        )
      );
      setModalConfirmacaoOpen(false);
      setSelectedReserva(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateReserva = async (nome, data, horario) => {
    try {
      const novaReserva = await createReserva(nome, data, horario);
      setDados((prevDados) => [...prevDados, novaReserva]);
      setModalCriacaoOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditReserva = async (nome, data, horario) => {
    if (selectedReserva) {
      try {
        const dadosAtualizados = {
          nome,
          data,
          horario,
          status: selectedReserva.status,
        };

        const reservaAtualizada = await updateReserva(
          selectedReserva.id,
          dadosAtualizados
        );

        setDados((prevDados) =>
          prevDados.map((item) =>
            item.id === selectedReserva.id ? reservaAtualizada : item
          )
        );
        setModalEdicaoOpen(false);
        setSelectedReserva(null);
      } catch (error) {
        console.error('Erro ao atualizar reserva:', error.message);
      }
    }
  };

  const handleOpenEdicao = (reserva) => {
    if (reserva.status !== 'ativo') {
      toast.warning(
        'Não é possível editar uma reserva que não está com status ativo.'
      );
      return;
    }
    setSelectedReserva(reserva);
    setModalEdicaoOpen(true);
  };

  const colunas = [
    { header: 'LOCAL', accessor: 'nome' },
    { header: 'DATA', accessor: 'data' },
    { header: 'HORÁRIO', accessor: 'horario' },
    { header: 'STATUS', accessor: 'status' },
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
        <h1>LISTAGEM DE RESERVAS</h1>
        {!isAdmin && (
          <button
            className="criar-ocorrencia-btn"
            onClick={() => setModalCriacaoOpen(true)}
          >
            CRIAR RESERVA
          </button>
        )}
      </div>
      <DataTable data={dados} columns={colunas} />
      <ModalCriacaoReservas
        isOpen={modalCriacaoOpen}
        onClose={() => setModalCriacaoOpen(false)}
        onCreate={handleCreateReserva}
      />
      <ModalEdicaoReservas
        isOpen={modalEdicaoOpen}
        onClose={() => setModalEdicaoOpen(false)}
        onEdit={handleEditReserva}
        initialData={
          selectedReserva || { nome: '', data: '', horario: '' }
        }
      />
      {selectedReserva && (
        <ModalDetalhes
          isOpen={modalOpen}
          onClose={handleCloseModal}
          tituloHeader="Detalhes da Reserva"
          titulo={selectedReserva.nome}
          descricao={`Data: ${selectedReserva.data}, Horário: ${selectedReserva.horario}`}
        />
      )}
      <ModalConfirmacao
        isOpen={modalConfirmacaoOpen}
        onClose={() => setModalConfirmacaoOpen(false)}
        onConfirm={handleConfirmacao}
        titulo={selectedReserva ? selectedReserva.nome : ''}
      />
    </div>
  );
};

export default TelaReservas;
