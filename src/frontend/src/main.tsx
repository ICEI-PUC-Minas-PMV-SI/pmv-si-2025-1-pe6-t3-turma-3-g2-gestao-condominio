import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TelaOcorrencias from './pages/ListaOcorrencias';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ocorrencias" element={<TelaOcorrencias />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
