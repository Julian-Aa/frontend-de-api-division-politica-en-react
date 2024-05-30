import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SectorList from './components/SectorList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SectorList />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
