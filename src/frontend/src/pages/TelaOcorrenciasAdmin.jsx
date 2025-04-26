import React, { useState, useEffect } from 'react';
import '../styles/datatable.css';
import { DataTable } from '../components/DataTable';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import ModalDetalhes from '../components/ModalDetalhes';
import ModalEditarStatus from '../components/ModalEditarStatus';
import {
  getOcorrenciasAdmin,
  updateOcorrenciaStatusAdmin,
} from '../services/ocorrenciasAdminService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

const TelaOcorrenciasAdmin = () => {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatusOpen, setModalStatusOpen] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState(null);

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const ocorrencias = await getOcorrenciasAdmin();
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

  const handleOpenStatusModal = (ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setModalStatusOpen(true);
  };

  const handleEditStatus = async (status) => {
    try {
      const updatedOcorrencia = await updateOcorrenciaStatusAdmin(
        selectedOcorrencia.id,
        status
      );

      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === selectedOcorrencia.id ? updatedOcorrencia : item
        )
      );

      setModalStatusOpen(false);
      setSelectedOcorrencia(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const colunas = [
    { header: 'TÍTULO', accessor: 'titulo' },
    {
      header: 'DESCRIÇÃO',
      render: (item) => truncateString(item.descricao, 30),
    },
    { header: 'STATUS', accessor: 'status' },
    {
      header: 'E-MAIL',
      render: (item) => item.User?.email || 'Não informado',
    },
    {
      header: 'AÇÕES',
      render: (item) => (
        <>
          <button onClick={() => handleOpenModal(item)}>
            <FaInfoCircle />
          </button>
          <button onClick={() => handleOpenStatusModal(item)}>
            <FaEdit />
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
      </div>
      <DataTable data={dados} columns={colunas} />

      {selectedOcorrencia && (
        <ModalDetalhes
          isOpen={modalOpen}
          onClose={handleCloseModal}
          titulo={selectedOcorrencia.titulo}
          descricao={selectedOcorrencia.descricao}
        />
      )}

      {selectedOcorrencia && (
        <ModalEditarStatus
          isOpen={modalStatusOpen}
          onClose={() => setModalStatusOpen(false)}
          onSave={(status) => handleEditStatus(status)}
          currentStatus={selectedOcorrencia.status}
        />
      )}
    </div>
  );
};

export default TelaOcorrenciasAdmin;