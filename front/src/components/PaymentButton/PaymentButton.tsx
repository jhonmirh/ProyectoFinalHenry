"use client"; 

import React, { useState } from "react";
import axios from "axios";
import { useLoggin } from "@/context/logginContext";

interface PaymentButtonProps {
  amount: number;
  currency: string;
  description: string;
  id: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  currency,
  description,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const { userData } = useLoggin();
  const token = userData?.token;

  const handlePayment = async () => {
    setLoading(true);

    const amountInCents = Math.round(amount * 100);

    try {

      

      localStorage.setItem(
        "reservation",
        JSON.stringify({ id, price: amountInCents })
      );

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/checkout`,
        {
          amount: amountInCents,
          currency,
          description,
          id, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("Hubo un error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-mostaza border-mostaza uppercase text-white py-2 px-4 hover:bg-opacity-70 transition-all"
      disabled={loading}
    >
      {loading ? "Procesando..." : "Pagar"}
    </button>
  );
};
