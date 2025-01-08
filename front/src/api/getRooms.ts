import { Room } from "@/interfaces";

export const getRooms = async (): Promise<Room[]> => {  
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic

    try {
        const res = await fetch(`${APIURL}/rooms/getRooms`, {
            headers: {
                'Cache-Control': 'no-store', 
                'Authorization': `Bearer ${token}`, 
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch rooms');
        }

        const data: Room[] = await res.json(); 
        console.log("Rooms fetched:", data);  
        return data; 
    } catch (error) {
        console.log("Error fetching rooms:", error);
        return [];
    }
};

export const getRoomById = async (id: string): Promise<Room | null> => {
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${APIURL}/rooms/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching room: ${response.statusText}`);
        }

        const room = await response.json();
        return room || null;
    } catch (error) {
        console.error("Error fetching room by id:", error);
        return null;
    }
};
