"use client";

import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectAfterDelay = () => {
  const router = useRouter();
  const { userData } = useLoggin();

  console.log('====================================');
  console.log(userData);
  console.log('====================================');

  useEffect(() => {
    const delayRedirect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
      router.push("/"); // Redirige a "/"
    };

    delayRedirect();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">Redirigiendo...</h1>
      <p className="text-gray-600 mt-2">Serás redirigido a la página principal en unos momentos.</p>
    </div>
  );
};

export default RedirectAfterDelay;
