"use client";

import { clientDetails } from "@/api/clientDetails";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProtectedClient from "../ProtectedClient/page";


interface Reservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservations: Reservation[];
}

const ClientDetails: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const clientId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await clientDetails(clientId);
        setClient(data);
      } catch (error) {
        console.error("Error al obtener los detalles del cliente:", error);
        setError("No se pudo cargar la información del cliente");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  if (loading) {
    return <div>Cargando detalles del cliente...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!client) {
    return <div>No se encontró información del cliente</div>;
  }

  return (
    <ProtectedClient>
      <div className="shadow-md rounded-lg overflow-hidden mt-4 min-h-screen">
        <h2 className="text-[2.5rem] font-semibold px-6 py-4">
          Detalles del Cliente
        </h2>
        <div className="px-6 py-4">
          <h3>
            <strong>Nombre:</strong> {client.name}
          </h3>
          <h3>
            <strong>Email:</strong> {client.email}
          </h3>
          <h3>
            <strong>Teléfono:</strong> {client.phone}
          </h3>
        </div>
        {/* <h3 className="text-[1.5rem] font-semibold px-6 py-4">
          Historial de Reservas
        </h3>
        {client.reservations.length === 0 ? (
          <p className="px-6 py-4">No hay reservas para este cliente.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-grisOscuro font-primary text-[1rem] font-medium text-gray-500 uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-6 py-3 text-grisOscuro font-primary text-[1rem] font-medium text-gray-500 uppercase tracking-wider">
                  Check-out
                </th>
                <th className="px-6 py-3 text-grisOscuro font-primary text-[1rem] font-medium text-gray-500 uppercase tracking-wider">
                  Habitación
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {client.reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-grisClaro">
                    {new Date(reservation.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-grisClaro">
                    {new Date(reservation.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-grisClaro">
                    {reservation.roomId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} */}
      </div>
    </ProtectedClient>
  );
};

export default ClientDetails;
