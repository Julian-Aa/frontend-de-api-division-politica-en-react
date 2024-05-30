import React, { useState, useEffect } from 'react';
import CiudadService from '../services/api';

const CiudadDetail = ({ id }) => {
  const [ciudad, setCiudad] = useState(null);

  useEffect(() => {
    CiudadService.getCiudadById(id)
      .then(response => {
        setCiudad(response.data);
      })
      .catch(error => {
        console.error('Error fetching ciudad:', error);
      });
  }, [id]);

  return (
    <div>
      {ciudad ? (
        <div>
          <h2>{ciudad.nombre}</h2>
          {/* Mostrar otros detalles de la ciudad aquí */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CiudadDetail;
