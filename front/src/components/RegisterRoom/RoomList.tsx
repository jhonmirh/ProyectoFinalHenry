import { useState, useEffect } from "react";
import { getRooms } from "@/api/getRooms";
import { editRoomsService } from "@/api/editRoomsService";

type Room = {
  id: string;
  title: string;
  size: string;
  beds: number;
  rating: number;
  image?: string;
  price: number;
  description: string;
  roomType: string;
  roomNumber: number;
  isDeleted: boolean;
  available: boolean;
};

const EditableCell = ({ value, onChange, type = "text" }: { value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? (type === 'number' ? 0 : '') : e.target.value;
    onChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <input
      type={type}
      value={value === undefined || value === null ? '' : value}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
};

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [editedRoom, setEditedRoom] = useState<Partial<Room>>({});

  const HandleEditRooms = async (id: string) => {
    try {
      const updatedRoomData = { ...editedRoom };
      const updatedRoom = await editRoomsService(id, updatedRoomData);
  
      setRooms(
        rooms.map((room) =>
          room.id === id ? { ...room, ...updatedRoomData } : room
        )
      );
  
      console.log("Habitación actualizada con éxito:", updatedRoom);
  
      setEditingRoom(null);
      setEditedRoom({});
    } catch (error) {
      console.log('Error al intentar editar la habitación: ', error);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = (await getRooms()) as Room[];
      setRooms(fetchedRooms);
    };
    fetchRooms();
  }, []);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleToggleAvailability = async (id: string) => {
    try {
      const roomToUpdate = rooms.find((room) => room.id === id);
      if (!roomToUpdate) return;
  
      const updatedRoom = { ...roomToUpdate, available: !roomToUpdate.available };
  
      // Actualizar el estado local
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === id ? updatedRoom : room))
      );
  
      const serverResponse = await editRoomsService(id, { available: updatedRoom.available });
      console.log("Estado de la habitación actualizado en el servidor:", serverResponse);
  
    } catch (error) {
      console.log("Error al intentar deshabilitar o habilitar la habitación:", error);
    }
  };
  useEffect(() => {
    console.log("Habitaciones actualizadas:", rooms);
  }, [rooms]);
  
  // En tu JSX, muestra el mensaje de estado
  {statusMessage && <div>{statusMessage}</div>}

  const handleEditRoom = (id: string) => {
    const roomToEdit = rooms.find((room) => room.id === id);
    if (roomToEdit) {
      setEditedRoom({ ...roomToEdit });
      setEditingRoom(id);
    }
  };

  return (
    <div className="shadow rounded-lg p-6">
      <div className="overflow-x-auto border-gray-200 rounded shadow-lg w-[95%] mx-auto">
      <h4 className="text-xl font-semibold mb-4 p-4">Lista de Habitaciones</h4>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-crema text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Número</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-crema text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-crema text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-crema text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-crema text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-5 py-5 border-b border-gray-200  text-sm">
                  {editingRoom === room.id ? (
                    <EditableCell
                      value={editedRoom.roomNumber ?? room.roomNumber}
                      onChange={(e) =>
                        setEditedRoom((prev) => ({ ...prev, roomNumber: parseInt(e.target.value, 10) }))
                      }
                      type="number"
                    />
                  ) : (
                    room.roomNumber
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200  text-sm">
                  {editingRoom === room.id ? (
                    <EditableCell
                      value={editedRoom.roomType ?? room.roomType}
                      onChange={(e) =>
                        setEditedRoom((prev) => ({ ...prev, roomType: e.target.value }))
                      }
                    />
                  ) : (
                    room.roomType
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200  text-sm">
                  {editingRoom === room.id ? (
                    <EditableCell
                      value={editedRoom.price ?? room.price}
                      onChange={(e) =>
                        setEditedRoom((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
                      }
                      type="number"
                    />
                  ) : (
                    `$${room.price}`
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200  text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold ${room.available ? "text-green-900" : "text-red-900"} leading-tight`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 ${room.available ? "bg-green-200" : "bg-red-200"} opacity-50 rounded-full`}
                    ></span>
                    <span className="relative">
                      {room.available ? "Disponible" : "No Disponible"}
                    </span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200  text-sm">
                  {editingRoom === room.id ? (
                    <button
                      onClick={() => HandleEditRooms(room.id)}
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
