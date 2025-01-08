"use client";
import React, { useState, useEffect } from "react";
import RoomCard from "@/components/Rooms/RoomCard";
import { getRooms } from "@/api/getRooms";
import { Room } from "@/interfaces/index";
import { useRouter } from "next/navigation";

const Page = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sortedRooms, setSortedRooms] = useState<Room[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("default");
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        console.log("Fetched rooms:", fetchedRooms);
        setRooms(fetchedRooms);
        setSortedRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSort = (criteria: string) => {
    let sorted: Room[] = [...rooms];

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

  const handleRegisterRoom = () => {
    router.push("/roomsManagement");
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 mb-6 p-6">
        <div className="text-center">
          <h1 className="text-[2.5rem]">
            Habitaciones y Suites del Hotel Elysium
          </h1>
          <p className="pt-5">
            Descubra nuestras elegantes opciones de alojamiento diseñadas para
            ofrecerle una experiencia única de confort y lujo
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between ">
          <button
            className="py-2 px-6 hover:bg-opacity-70 shadow-md"
            onClick={handleRegisterRoom}
          >
            Registrar nueva habitación
          </button>
          <select
            className="bg-mostaza text-white border-mostaza py-2 px-3 hover:bg-opacity-90"
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 pl-10">
        {sortedRooms.length > 0 ? (
          sortedRooms.map((room, i) => <RoomCard key={i} {...room} />)
        ) : (
          <p className="col-span-full text-center">No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
