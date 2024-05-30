// src/components/CiudadForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const CiudadForm = () => {
  const [nombreCiudad, setNombreCiudad] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoId, setDepartamentoId] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get('/departamentos')
      .then(response => setDepartamentos(response.data))
      .catch(error => console.error('Error fetching data:', error));

    if (id) {
      axios.get(`/ciudades/${id}`)
        .then(response => {
          setNombreCiudad(response.data.nombreCiudad);
          setDepartamentoId(response.data.departamento.id);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const ciudad = { nombreCiudad, departamento: { id: departamentoId } };

    if (id) {
      axios.put(`/ciudades/${id}`, ciudad)
        .then(() => history.push('/ciudades'))
        .catch(error => console.error('Error updating city:', error));
    } else {
      axios.post('/ciudades', ciudad)
        .then(() => history.push('/ciudades'))
        .catch(error => console.error('Error creating city:', error));
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Editar Ciudad' : 'Agregar Ciudad'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Ciudad</label>
          <input
            type="text"
            className="form-control"
            value={nombreCiudad}
            onChange={(e) => setNombreCiudad(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Departamento</label>
          <select
            className="form-control"
            value={departamentoId}
            onChange={(e) => setDepartamentoId(e.target.value)}
          >
            {departamentos.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default CiudadForm;
