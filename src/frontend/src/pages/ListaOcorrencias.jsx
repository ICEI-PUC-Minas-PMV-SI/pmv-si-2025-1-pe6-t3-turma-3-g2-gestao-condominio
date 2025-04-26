import React, { useState, useEffect } from 'react';
import '../styles/datatable.css';
import { DataTable } from '../components/DataTable';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import ModalDetalhes from '../components/ModalDetalhes';
import ModalCriacao from '../components/ModalCriacao';
import ModalConfirmacao from '../components/ModalConfirmacao';
import ModalEdicao from '../components/ModalEdicao';
import {
  getOcorrencias,
  createOcorrencia,
  updateOcorrencia,
  deleteOcorrencia,
} from '../services/ocorrenciasService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

const TelaOcorrencias = () => {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState(null);
  const [modalConfirmacaoOpen, setModalConfirmacaoOpen] = useState(false);
  const [modalCriacaoOpen, setModalCriacaoOpen] = useState(false);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const ocorrencias = await getOcorrencias();
        setDados(ocorrencias);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOcorrencias();
  }, []);

  const handleOpenModal = (ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOcorrencia(null);
  };

  const handleOpenConfirmacao = (ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setModalConfirmacaoOpen(true);
  };

  const handleConfirmacao = async () => {
    try {
      await deleteOcorrencia(selectedOcorrencia.id);
      setDados((prevDados) =>
        prevDados.filter((item) => item.id !== selectedOcorrencia.id)
      );
      setModalConfirmacaoOpen(false);
      setSelectedOcorrencia(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateOcorrencia = async (titulo, descricao) => {
    try {
      const novaOcorrencia = await createOcorrencia(titulo, descricao);
      setDados((prevDados) => [...prevDados, novaOcorrencia]);
      setModalCriacaoOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditOcorrencia = async (titulo, descricao) => {
    if (selectedOcorrencia) {
      try {
        const ocorrenciaAtualizada = await updateOcorrencia(
          selectedOcorrencia.id,
          titulo,
          descricao
        );
        setDados((prevDados) =>
          prevDados.map((item) =>
            item.id === selectedOcorrencia.id ? ocorrenciaAtualizada : item
          )
        );
        setModalEdicaoOpen(false);
        setSelectedOcorrencia(null);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleOpenEdicao = (ocorrencia) => {
    if (ocorrencia.status !== 'aberto') {
      toast.warning(
        'Não é possível editar uma ocorrência que não está com status aberto.'
      );
      return;
    }
    setSelectedOcorrencia(ocorrencia);
    setModalEdicaoOpen(true);
  };

  const colunas = [
    { header: 'TÍTULO', accessor: 'titulo' },
    {
      header: 'DESCRIÇÃO',
      render: (item) => truncateString(item.descricao, 30),
    },
    { header: 'STATUS', accessor: 'status' },
    {
      header: 'AÇÕES',
      render: (item) => (
        <>
          <button onClick={() => handleOpenModal(item)}>
            <FaInfoCircle />
          </button>
          <button onClick={() => handleOpenEdicao(item)}>
            <FaEdit />
          </button>
          <button onClick={() => handleOpenConfirmacao(item)}>
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <ToastContainer
        position="bottom-right"
        toastStyle={{
          fontSize: '18px',
          width: '400px',
          padding: '20px',
        }}
      />
    <div className="header">

      <h1>LISTAGEM DAS OCORRÊNCIAS</h1>
      <button
        className="criar-ocorrencia-btn"
        onClick={() => setModalCriacaoOpen(true)}
      >
        CRIAR OCORRÊNCIA
      </button>
      </div>
      <DataTable data={dados} columns={colunas} />
      <ModalCriacao
        isOpen={modalCriacaoOpen}
        onClose={() => setModalCriacaoOpen(false)}
        onCreate={handleCreateOcorrencia}
      />
      <ModalEdicao
        isOpen={modalEdicaoOpen}
        onClose={() => setModalEdicaoOpen(false)}
        onEdit={handleEditOcorrencia}
        initialData={selectedOcorrencia || { titulo: '', descricao: '' }}
      />
      {selectedOcorrencia && (
        <ModalDetalhes
          isOpen={modalOpen}
          onClose={handleCloseModal}
          titulo={selectedOcorrencia.titulo}
          descricao={selectedOcorrencia.descricao}
        />
      )}
      <ModalConfirmacao
        isOpen={modalConfirmacaoOpen}
        onClose={() => setModalConfirmacaoOpen(false)}
        onConfirm={handleConfirmacao}
        titulo={selectedOcorrencia ? selectedOcorrencia.titulo : ''}
      />
    </div>
  );
};

export default TelaOcorrencias;