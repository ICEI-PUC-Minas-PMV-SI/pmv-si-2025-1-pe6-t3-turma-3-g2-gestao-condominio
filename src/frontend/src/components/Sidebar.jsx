import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function decodeToken(token) {
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

function Sidebar() {
  const token = localStorage.getItem('authToken');
  let isAdmin = false;

  if (token) {
    const decoded = decodeToken(token);
    const userId = decoded?.id;

    isAdmin = userId === 1;
  }

  return (
    <div className="sidebar">
      <img src="/logo-habitare.jpg" alt="Logo Habitare" />
      <nav>
        <ul>
          {isAdmin ? (
            <>
              <li>
                {/* <Link to="/home">Início</Link> */}
              </li>
              <li>
                <Link to="/admin/ocorrencias">Ocorrências</Link>
              </li>
              <li>
                <Link to="/reservas">Reservas</Link>
              </li>
              <li>
                <Link to="/admin/moradores">Moradores</Link>
              </li>
              <li>
                <Link to="/register">Registrar</Link>
              </li>
              {/* <li><Link to="/listar/visitantes">Visitantes</Link></li> */}
            </>
          ) : (
            <>
              <li>
                {/* <Link to="/home">Início</Link> */}
              </li>
              <li>
                <Link to="/ocorrencias">Ocorrências</Link>
              </li>
              <li>
                <Link to="/reservas">Reservas</Link>
              </li>
              <li>
                <Link to="/moradores">Moradores</Link>
              </li>
              <li>
                <Link to="/visitantes">Visitantes</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
