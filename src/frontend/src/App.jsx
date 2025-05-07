import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'; // Adicione a tela Home aqui
import TelaOcorrencias from './pages/ListaOcorrencias';
import TelaOcorrenciasAdmin from './pages/TelaOcorrenciasAdmin';
import TelaReservas from './pages/ListaReservas'; // ou o caminho correto


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ocorrencias" element={<TelaOcorrencias />} />
        <Route path="/admin/ocorrencias" element={<TelaOcorrenciasAdmin />} />
        <Route path="/reservas" element={<TelaReservas />} />
        <Route path="/admin/reservas" element={<TelaReservas />} />
      </Routes>
    </div>
  )
}

export default App
