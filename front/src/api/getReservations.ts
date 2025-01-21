import { useEffect, useState } from 'react';
import { Reservation, Room } from "@/interfaces";
import { getRooms } from "@/api/getRooms";


export const getRoomById = async (id: string): Promise<Room | null> => {
  try {
    const rooms = await getRooms();
    return rooms.find((room) => room.id === id) || null;
  } catch (error) {
    console.error("Error fetching room by id:", error);
    return null;
  }
};

export const getReservations = async (userId: string, token: string): Promise<(Reservation & { room: Room | null })[]> => {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  if (!userId) {
    console.error("No userId provided.");
    return [];
  }

  try {
    console.log(`Fetching reservations for userId: ${userId}`);
    const res = await fetch(`${APIURL}/reservations/${userId}`, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch reservations: ${res.statusText}`);
    }

    const reservations: Reservation[] = await res.json();

    // Enriquecer cada reserva con los datos de la habitación
    const reservationsWithRooms = await Promise.all(
      reservations.map(async (reservation) => {
        const room = await getRoomById(reservation.roomId);
        return { ...reservation, room };
      })
    );

    console.log("Reservations with room data fetched successfully:", reservationsWithRooms);
    return reservationsWithRooms;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};


export const deleteReservation = async (id: string, token: string | undefined): Promise<void> => {
  if (!token) {
    throw new Error("Token no proporcionado.");
  }

  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${APIURL}/reservations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error eliminando reservación: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    throw error;
  }
};





