"use client"
import React, { useState, useEffect } from "react";
import RoomCard from "@/components/Rooms/RoomCard";
import { getRooms } from "@/api/getRooms";
import { Room } from "@/interfaces/index";
import { Range } from "react-range";

const Page = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sortedRooms, setSortedRooms] = useState<Room[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [useGuestCount, setUseGuestCount] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        setRooms(fetchedRooms);
        setSortedRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const applyFilters = () => {
    const filteredRooms = rooms.filter((room) => {
      const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
      const matchesGuests = !useGuestCount || room.beds === guestCount;
      return matchesPrice && matchesGuests;
    });
    setSortedRooms(filteredRooms);
  };

  const handleSort = (criteria: string) => {
    let sorted = [...rooms];

    if (criteria === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (criteria === "default") {
      sorted = [...rooms];
    }

    setSortCriteria(criteria);
    setSortedRooms(sorted);
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 mb-6 p-6">
        <div className="text-center">
          <h1 className="text-[2.5rem]">Habitaciones y Suites del Hotel Elysium</h1>
          <p className="pt-5">
            Descubra nuestras elegantes opciones de alojamiento diseñadas para
            ofrecerle una experiencia única de confort y lujo.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="hover:bg-opacity-70 shadow-md"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filtrar por
            </button>

            {showFilter && (
              <div className="absolute left-0 mt-2 bg-grisClaro shadow-lg rounded-lg p-4 w-72 z-10">
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Rango de precio:
                  </label>
                  <Range
                    step={500}
                    min={0}
                    max={5000}
                    values={priceRange}
                    onChange={(values) => setPriceRange([values[0], values[1]])}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-full h-2 bg-gray-200 rounded-md"
                      >
                        {children}
                      </div>
                    )}

                    renderThumb={({ props }) => {
                      let { key, ...restProps } = props;
                      return (
                        <div
                          key={key}
                          {...restProps}
                          className="w-4 h-4 bg-mostaza rounded-full shadow-md"
                        />
                      );
                    }}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Desea seleccionar cantidad de huéspedes?
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={guestCount}
                      onChange={(e) => setGuestCount(+e.target.value)}
                      className="py-2 px-4 border rounded-md w-full "
                      disabled={!useGuestCount}
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={useGuestCount}
                        onChange={(e) => setUseGuestCount(e.target.checked)}
                        className="mr-2 accent-mostaza border-grisOscuro"
                      />
                      {useGuestCount ? "Sí" : "No"}
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => {
                    applyFilters();
                    setShowFilter(false);
                  }}
                  className="w-full py-2 bg-mostaza text-white rounded-lg hover:bg-opacity-70 shadow-md"
                >
                  Aplicar
                </button>
                <button
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setGuestCount(0);
                    setUseGuestCount(false);
                    setSortedRooms(rooms);
                    setShowFilter(false);
                  }}
                  className="w-full mt-2 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 shadow-md"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

          <select
            className="bg-mostaza text-white  rounded-lg py-2 px-6 hover:bg-grisClaro shadow-md text-base transition duration-300 ease-in-out"
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="price">Precio</option>
            <option value="rating">Calificación</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 pl-10">
        {sortedRooms.length > 0 ? (
          sortedRooms.map((room, i) => <RoomCard key={i} {...room} />)
        ) : (
          <p className="col-span-full text-center">No hay habitaciones disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Page;
