'use client'
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

const SuccessPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = new URLSearchParams(window.location.search).get('reservationId');
      setReservationId(id);
    }
  }, [])

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!reservationId) {
        setError('No se pudo encontrar el ID de la reserva.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/payments/success?reservationId=${reservationId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Hubo un error al actualizar el estado del pago.');
        }


        setPaymentSuccess(true);
        setLoading(false);
      } catch (err) {
        setError('Hubo un error al procesar tu pago. Intenta nuevamente.');
        setLoading(false);
        console.error(err);
      }
    };

    updatePaymentStatus();
  }, [reservationId]);

  if (loading) {
    return (
      <div className="text-center">
        <p>Cargando...</p>

      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-6xl font-extrabold mb-12 text-center bg-gradient-to-r text-titulo bg-clip-text">
        Pago Exitoso
      </h2>
      <h1 className="text-4xl text-center mb-8">¡Gracias por tu compra!</h1>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {paymentSuccess ? (
            <p className="text-center mb-8">
              Tu transacción se ha completado con éxito. Pronto recibirás un correo electrónico con los detalles de tu compra.
            </p>
          ) : (
            <p className="text-center text-red-500">Hubo un problema con el pago. Por favor, intenta nuevamente.</p>
          )}
        </>
      )}
      <div className="text-center">
        <Link href="/" legacyBehavior>
          <a className="bg-mostaza border-mostaza uppercase text-white py-2 px-4 hover:bg-opacity-70 transition-all">
            Volver al Inicio
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
