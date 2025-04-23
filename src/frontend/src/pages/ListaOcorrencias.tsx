import React, { useState } from 'react';
import '../styles/datatable.css';
import { DataTable, Column } from '../components/DataTable';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import ModalDetalhes from '../components/ModalDetalhes';
import ModalCriacao from '../components/ModalCriacao';
import ModalConfirmacao from '../components/ModalConfirmacao';
import ModalEdicao from '../components/ModalEdicao';

type Ocorrencia = {
  titulo: string;
  descricao: string;
  status: string;
};

const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

const dados: Ocorrencia[] = [
  { titulo: 'Título 1', descricao: 'Descrição longa que deve ser truncada se ultrapassar um certo número de caracteres.', status: '' },
  { titulo: 'Título 2', descricao: 'Descrição 2', status: '' },
  { titulo: 'Título 3', descricao: 'Descrição 3', status: '' },
  { titulo: 'Título 4', descricao: 'Descrição 4', status: '' },
];

const TelaOcorrencias = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<Ocorrencia | null>(null);
  const [modalConfirmacaoOpen, setModalConfirmacaoOpen] = useState(false);
  const [modalCriacaoOpen, setModalCriacaoOpen] = useState(false);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);

  const handleOpenModal = (ocorrencia: Ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOcorrencia(null);
  };

  const handleOpenConfirmacao = (ocorrencia: Ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setModalConfirmacaoOpen(true);
  };

  const handleConfirmacao = () => {
    console.log('Ocorrência excluída:', selectedOcorrencia);
    setModalConfirmacaoOpen(false);
    setSelectedOcorrencia(null);
  };

  const handleCreateOcorrencia = (titulo: string, descricao: string) => {
    console.log('Nova ocorrência criada:', { titulo, descricao });
  };

  const handleEditOcorrencia = (titulo: string, descricao: string) => {
    if (selectedOcorrencia) {
      console.log('Ocorrência editada:', { titulo, descricao });
      // Aqui você pode atualizar a lista de ocorrências
    }
    setModalEdicaoOpen(false);
    setSelectedOcorrencia(null);
  };

  const colunas: Column<Ocorrencia>[] = [
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
          <button onClick={() => {
            setSelectedOcorrencia(item);
            setModalEdicaoOpen(true);
          }}>
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
      <h1>LISTAGEM DAS OCORRÊNCIAS</h1>
      <button className="criar-ocorrencia-btn" onClick={() => setModalCriacaoOpen(true)}>CRIAR OCORRÊNCIA</button>
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