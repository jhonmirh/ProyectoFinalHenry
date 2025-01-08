export const postBooking = async (userId: string, roomId: string, checkInDate: Date, checkOutDate: Date, token: string) => {
    const data = { userId, roomId, checkInDate, checkOutDate };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    console.log("Datos enviados al backend:", data);
    try {
      const res = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.log(`Error ${res.status}: ${errorText}`);
        throw new Error(`Error ${res.status}: ${errorText}`);
      }
  
      return await res.json();
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.log("Error de conexión:", error);
      } else {
        console.log("Error posting bookings:", error);
      }
      throw error;
    }
  };