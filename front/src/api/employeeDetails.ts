export default async function getAllEmployee () {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${APIURL}/employee`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return [];
  }
}