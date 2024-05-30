import React, { useEffect, useState } from 'react';
import { getSectores, createSector } from '../services/api';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const SectorList = () => {
  const [sectores, setSectores] = useState([]);
  const [show, setShow] = useState(false);
  const [newSector, setNewSector] = useState({ nombre: '', numeroCasa: '', ciudad: null, sectorPadre: null });

  useEffect(() => {
    fetchSectores();
  }, []);

  const fetchSectores = async () => {
    try {
      const response = await getSectores();
      setSectores(response.data);
    } catch (error) {
      console.error('Error fetching sectores:', error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setNewSector({ ...newSector, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSector(newSector);
      fetchSectores();
      handleClose();
    } catch (error) {
      console.error('Error creating sector:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Sectores</h1>
      <Button variant="primary" onClick={handleShow}>
        Crear Sector
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Número de Casa</th>
            <th>Ciudad</th>
            <th>Sector Padre</th>
          </tr>
        </thead>
        <tbody>
          {sectores.map((sector) => (
            <tr key={sector.id}>
              <td>{sector.id}</td>
              <td>{sector.nombre}</td>
              <td>{sector.numeroCasa}</td>
              <td>{sector.ciudad ? sector.ciudad.nombreCiudad : 'N/A'}</td>
              <td>{sector.sectorPadre ? sector.sectorPadre.nombre : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Sector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newSector.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="numeroCasa">
              <Form.Label>Número de Casa</Form.Label>
              <Form.Control
                type="text"
                name="numeroCasa"
                value={newSector.numeroCasa}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Agrega más campos según sea necesario */}
            <Button variant="primary" type="submit" className="mt-3">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SectorList;
