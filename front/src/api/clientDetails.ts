export const clientDetails = async (id: string) => {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${APIURL}/users/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error en la respuesta del servidor: ${response.status} ${response.statusText}. Detalles: ${errorText}`);
      // throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}. Detalles: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener detalles del cliente:', error);
    throw error;
  }
};


export interface Reservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservations: Reservation[];
}


export const clientDetailsAll = async (): Promise<Client[]> => {
  const response = await fetch('http://localhost:4000/users/clientlist');
  if (!response.ok) {
    throw new Error('Error al obtener los detalles de los clientes');
  }
  const data = await response.json();
  return data;
};


export const fetchClientsWithReservations = async (token: string) => {
  const response = await fetch('/api/users/clientlist', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener la lista de clientes con reservas');
  }

  return response.json();
};
