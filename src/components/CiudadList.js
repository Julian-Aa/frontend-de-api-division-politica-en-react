// src/components/CiudadList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CiudadList = () => {
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    axios.get('/ciudades')
      .then(response => setCiudades(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container">
      <h1>Lista de Ciudades</h1>
      <Link to="/ciudad/new" className="btn btn-primary mb-3">Agregar Ciudad</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ciudades.map(ciudad => (
            <tr key={ciudad.id}>
              <td>{ciudad.id}</td>
              <td>{ciudad.nombreCiudad}</td>
              <td>
                <Link to={`/ciudad/edit/${ciudad.id}`} className="btn btn-warning">Editar</Link>
                <button className="btn btn-danger ml-2" onClick={() => deleteCiudad(ciudad.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function deleteCiudad(id) {
    axios.delete(`/ciudades/${id}`)
      .then(() => setCiudades(ciudades.filter(ciudad => ciudad.id !== id)))
      .catch(error => console.error('Error deleting city:', error));
  }
};

export default CiudadList;
