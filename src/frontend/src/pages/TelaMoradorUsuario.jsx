import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTable } from '../components/DataTable';
import { FaInfoCircle, FaEdit } from 'react-icons/fa';
import ModalDetalhesMorador from '../components/ModalDetalhesMorador';
import ModalEditarMorador from '../components/ModalEditarMorador';
import { getMoradorDoUsuario, atualizarMorador } from '../services/moradoresService';

const TelaMoradoresUsuario = () => {
  const [morador, setMorador] = useState(null);
  const [moradorData, setMoradorData] = useState([]);
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  const fetchMorador = async () => {
    try {
      const data = await getMoradorDoUsuario();
      setMorador(data);
      setMoradorData(data ? [data] : []);
    } catch {
      toast.error('Erro ao carregar dados do morador');
    }
  };

  useEffect(() => {
    fetchMorador();
  }, []);

  const handleUpdateMorador = async (dados) => {
    try {
      await atualizarMorador(dados.id, dados);
      toast.success('Dados atualizados com sucesso');
      fetchMorador();
      setModalEditarOpen(false);
    } catch {
      toast.error('Erro ao atualizar dados');
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
          <button onClick={() => setModalDetalhesOpen(true)}><FaInfoCircle /></button>
          <button onClick={() => setModalEditarOpen(true)}><FaEdit /></button>
        </div>
      )
    }
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
        <h1>Meus Dados</h1>
      </div>
      
      {moradorData.length > 0 ? (
        <DataTable data={moradorData} columns={colunas} />
      ) : (
        <p>Carregando dados...</p>
      )}

      <ModalDetalhesMorador
        isOpen={modalDetalhesOpen}
        onClose={() => setModalDetalhesOpen(false)}
        morador={morador}
      />

      <ModalEditarMorador
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        morador={morador}
        onUpdate={handleUpdateMorador}
      />
    </div>
  );
};

export default TelaMoradoresUsuario;