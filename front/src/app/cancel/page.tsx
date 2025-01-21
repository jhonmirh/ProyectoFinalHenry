'use client';
import Link from 'next/link';
import { FC, useEffect } from 'react';

const CancelPage: FC = () => {
  useEffect(() => {

    localStorage.removeItem('reservation');
  }, []);

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-6xl font-extrabold mb-12 text-center bg-gradient-to-r text-titulo bg-clip-text">
        Pago Cancelado
      </h2>
      <h1 className="text-4xl text-center mb-8">Lo sentimos, tu transacción fue cancelada</h1>
      <p className="text-center mb-8">Si tienes alguna pregunta, no dudes en contactarnos.</p>
      
      <div className="text-center mt-4">
        <Link legacyBehavior href="/">
          <a className="bg-mostaza border-mostaza uppercase text-white py-2 px-4 hover:bg-opacity-70 transition-all">
            Volver al Inicio
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
