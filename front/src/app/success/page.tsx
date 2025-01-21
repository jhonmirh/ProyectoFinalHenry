'use client';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoggin } from '@/context/logginContext';
import Link from 'next/link';

const SuccessPage: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const { userData } = useLoggin();
  const token = userData?.token;
  const router = useRouter(); 

  useEffect(() => {
    const storedReservation = localStorage.getItem('reservation');
    if (storedReservation) {
      const parsedReservation = JSON.parse(storedReservation);
      setReservationId(parsedReservation.id);
    } else {
      setError('No se pudo encontrar el ID de la reserva en el almacenamiento local.');
    }
  }, []);

  useEffect(() => {
    console.log(reservationId);

    const updatePaymentStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/success?reservationId=${reservationId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        setPaymentSuccess(true);

        localStorage.removeItem('reservation');
      } catch (err) {
        setError('Hubo un error al procesar tu pago. Intenta nuevamente.');
        console.error(err);

        localStorage.removeItem('reservation');
      }
    };

    if (reservationId && token) {
      updatePaymentStatus();
    }
  }, [reservationId, token]);

  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        router.push('/myBookings'); 
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, router]);

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
            <p className="text-center text-red-500">
              &quot;Cargando&quot;
            </p>
          )}
        </>
      )}
      <div className="text-center">
        <Link href="/myBookings" legacyBehavior>
          <a className="bg-mostaza border-mostaza uppercase text-white py-2 px-4 hover:bg-opacity-70 transition-all">
            Tu Historial 
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
