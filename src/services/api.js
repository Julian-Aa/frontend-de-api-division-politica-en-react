import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Cambia esto a la URL de tu API

export const getSectores = () => axios.get(`${API_URL}/sectores`);
export const createSector = (sector) => axios.post(`${API_URL}/sectores`, sector);
export const getSubSectores = (id) => axios.get(`${API_URL}/sectores/${id}/subsectores`);
