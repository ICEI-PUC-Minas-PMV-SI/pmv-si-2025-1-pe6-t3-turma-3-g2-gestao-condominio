import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import TelaOcorrencias from './pages/ListaOcorrencias';
import TelaOcorrenciasAdmin from './pages/TelaOcorrenciasAdmin';
import TelaMoradoresAdmin from './pages/TelaMoradoresAdmin';
import TelaMoradorUsuario from './pages/TelaMoradorUsuario';
import TelaReservas from './pages/ListaReservas';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ocorrencias" element={<TelaOcorrencias />} />
        <Route path="/admin/ocorrencias" element={<TelaOcorrenciasAdmin />} />
        <Route path="/admin/moradores" element={<TelaMoradoresAdmin />} />
        <Route path="/moradores" element={<TelaMoradorUsuario />} />
        <Route path="/reservas" element={<TelaReservas />} />
        <Route path="/admin/reservas" element={<TelaReservas />} />
      </Routes>
    </div>
  )
}

export default App