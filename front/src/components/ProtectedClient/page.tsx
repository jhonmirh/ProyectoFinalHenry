"use client";

import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const ProtectedClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData, loadUserData } = useLoggin();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (!userData) {
        try {
          const data = await loadUserData();
        
          if (!data || (data.userData.role.name !== "Cliente" && data.userData.role.name !== "Administrador")) {
            Swal.fire({
              title: "Acceso Restringido",
              html: "Esta ruta es solo para usuarios registrados. <br> Por favor, inicia sesión.<br>Si no estás Registrado, por favor, Regístrate.",
              icon: "warning",
              confirmButtonText: "Aceptar",
            }).then(() => {
              router.push("/login");
            });
          }
        } catch (error) {
          console.error('Error al cargar los datos del usuario:', error);
          router.push("/login");
        }
      }
    };

    checkAccess();
  }, [router, loadUserData, userData]);

  if (userData === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-3xl font-bold shadow-lg shadow-gray-500/50">
         Espere. Cargando... Usuario No Registrado
        </div>
      </div>
    );
  }
 

  if (userData?.userData.role.name === "Cliente" || userData?.userData.role.name === "Administrador") {
    return <>{children}</>;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-500 text-3xl font-bold shadow-lg shadow-gray-500/50">
       Espere. Cargando...
      </div>
    </div>
  );
};

export default ProtectedClient;
