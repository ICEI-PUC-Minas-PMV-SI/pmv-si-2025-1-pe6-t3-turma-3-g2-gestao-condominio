import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTable } from '../components/DataTable';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ModalCriarUsuario from '../components/ModalCriarUsuario';
import ModalEditarUsuario from '../components/ModalEditarUsuario';
import ModalConfirmacao from '../components/ModalConfirmacao';
import { getUsuarios, criarUsuario, atualizarUsuario, deletarUsuario } from '../services/usuariosService';

const Register = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [modalCriarOpen, setModalCriarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      toast.error('Erro ao carregar usuários');
    }
  };

  const handleCreateUsuario = async (dados) => {
  try {
    await criarUsuario(dados);
    toast.success('Usuário criado com sucesso!');
    fetchUsuarios();
    setModalCriarOpen(false);
  } catch (error) {
    toast.error('Erro ao criar usuário');
    console.error(error);
  }
};

  const handleUpdateUsuario = async (dados) => {
    try {
      await atualizarUsuario(dados.id, dados);
      toast.success('Usuário atualizado com sucesso!');
      fetchUsuarios(); // Atualiza a lista de usuários
      setModalEditarOpen(false); // Fecha o modal
    } catch (error) {
      toast.error('Erro ao atualizar usuário');
      console.error(error);
    }
  };

  const handleDeleteUsuario = async (id) => {
  console.log(id);  // Verifique se o ID está sendo passado corretamente
  try {
    const response = await deletarUsuario(id);
    console.log(response);  // Para ver a resposta no console
    toast.success('Usuário excluído com sucesso!');
    fetchUsuarios();
    setModalExcluirOpen(false);
  } catch (error) {
    toast.error('Erro ao excluir usuário');
    console.error(error);
  }
};

  const colunas = [
    { header: 'NOME', accessor: 'name' },
    { header: 'EMAIL', accessor: 'email' },
    {
      header: 'AÇÕES',
      render: (item) => (
        <div className="acoes">
          <button onClick={() => { setUsuarioSelecionado(item); setModalEditarOpen(true); }}><FaEdit /></button>
          <button onClick={() => { setUsuarioSelecionado(item); setModalExcluirOpen(true); }}><FaTrash /></button>
        </div>
      )
    }
  ];

  return (
    <div className="container">
      <Sidebar />
      <ToastContainer />
      <div className="header">
        <h1>Usuários Registrados</h1>
        <button className="button-create" onClick={() => setModalCriarOpen(true)}>
          <FaPlus /> Criar Usuário
        </button>
      </div>
      <DataTable data={usuarios} columns={colunas} />

      <ModalCriarUsuario isOpen={modalCriarOpen} onClose={() => setModalCriarOpen(false)} onCreate={handleCreateUsuario} />
      <ModalEditarUsuario isOpen={modalEditarOpen} onClose={() => setModalEditarOpen(false)} usuario={usuarioSelecionado} onUpdate={handleUpdateUsuario} />
      <ModalConfirmacao isOpen={modalExcluirOpen} onClose={() => setModalExcluirOpen(false)} onConfirm={() => handleDeleteUsuario(usuarioSelecionado?.id)} titulo={usuarioSelecionado?.name} />
    </div>
  );
};

export default Register;
