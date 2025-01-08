"use client";

import React, { useState, useEffect } from "react";
import { getClientList } from "@/api/clientList";
import Link from "next/link";
import ProtectedAdmin from "../ProtectedAdmin/page";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClientList();
        setClients(data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(filter.toLowerCase()) ||
      client.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div>Cargando clientes...</div>;
  }

  return (
    <ProtectedAdmin>
      <div className="shadow rounded-lg p-6">
        <h3 className="text-[2.5rem] mb-4">Clientes Registrados</h3>
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <ul className="divide-y divide-gray-200">
          {filteredClients.map((client) => (
            <li key={client.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-[1.1rem] font-semibold">{client.name}</h4>
                  <p className="text-gray-500 truncate">{client.email}</p>
                </div>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="ml-4 bg-mostaza hover:bg-opacity-70 text-white py-2 px-4 hover:scale-105 transition-transform duration-300"
                >
                  Ver Detalles
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedAdmin>
  );
};

export default ClientList;
