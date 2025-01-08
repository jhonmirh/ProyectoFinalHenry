"use client";

import { useState } from "react";

type Room = {
  id: number;
  number: string;
  type: string;
  price: number;
  available: boolean;
};

const mockRooms: Room[] = [
  { id: 1, number: "101", type: "Individual", price: 100, available: true },
  { id: 2, number: "102", type: "Doble", price: 150, available: true },
  { id: 3, number: "103", type: "Suite", price: 250, available: true },
];

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [editingRoom, setEditingRoom] = useState<number | null>(null);

  const handleToggleAvailability = (id: number) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, available: !room.available } : room
      )
    );
  };

  const handleEditRoom = (id: number) => {
    setEditingRoom(id)
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveRoom = (id: number, updatedRoom: any) => {

    setRooms(rooms.map(room => 
      room.id === id ? { ...room, ...updatedRoom } : room
    ))
    setEditingRoom(null)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-xl font-semibold mb-4">Lista de Habitaciones</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Número
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {editingRoom === room.id ? (
                    <input
                      type="text"
                      defaultValue={room.number}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    room.number
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {editingRoom === room.id ? (
                    <input
                      type="text"
                      defaultValue={room.type}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    room.type
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {editingRoom === room.id ? (
                    <input
                      type="number"
                      defaultValue={room.price}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    `$${room.price}`
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold ${
                      room.available ? "text-green-900" : "text-red-900"
                    } leading-tight`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 ${
                        room.available ? "bg-green-200" : "bg-red-200"
                      } opacity-50 rounded-full`}
                    ></span>
                    <span className="relative">
                      {room.available ? "Disponible" : "No Disponible"}
                    </span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {editingRoom === room.id ? (
                    <button
                      onClick={() =>
                        handleSaveRoom(room.id, {
                          number: "nuevo número",
                          type: "nuevo tipo",
                          price: 100,
                          beds: 2,
                          rating: 4,
                          image: "nueva imagen",
                          description: "nueva descripción",
                        })
                      }
                      className="px-3 py-1 rounded text-white text-xs bg-green-500 hover:bg-green-600 mr-2"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditRoom(room.id)}
                      className="px-3 py-1 rounded text-white text-xs bg-blue-500 hover:bg-blue-600 mr-2"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleAvailability(room.id)}
                    className={`px-3 py-1 rounded text-white text-xs ${
                      room.available
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {room.available ? "Deshabilitar" : "Habilitar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
