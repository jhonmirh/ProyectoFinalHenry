'use client'

import React, { useState } from 'react';
import axios from 'axios';

interface PaymentButtonProps {
  amount: number;  // El precio en dólares
  currency: string;
  description: string;
  id: string;  // ID de la reserva
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, currency, description, id }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    // Convertir el precio a centavos (ej. 55 USD -> 5500)
    const amountInCents = Math.round(amount * 100);

    try {
      // Guardar los datos de la reserva en localStorage
      localStorage.setItem("reservation", JSON.stringify({ id, price: amountInCents }));

      // Realizar la solicitud al backend para crear la sesión de pago
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/checkout`, {
        amount: amountInCents,  // Pasamos el monto en centavos
        currency,
        description,
      });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirige a la URL de pago de Stripe
      }
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      alert('Hubo un error al iniciar el pago');
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
      {loading ? 'Procesando...' : 'Pagar'}
    </button>
  );
};
