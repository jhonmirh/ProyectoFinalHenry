import axios from 'axios';
import { log } from 'util';

export const getClientList = async (token:string) => {
  


  
  const response = await axios.get('http://localhost:4000/users/clientlist', {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
    },
  });
  return response.data;
};
