//import { User } from '../interfaces/user';

export const searchUser = async (searchTerm: string) => {
  const FAKE_API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${FAKE_API}/roles?search=${searchTerm}`);
    if (!response.ok) throw new Error("Error en la búsqueda");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

  