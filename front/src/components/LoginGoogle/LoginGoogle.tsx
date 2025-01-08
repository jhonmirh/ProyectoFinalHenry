"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useLoggin } from "@/context/logginContext";

export interface IloginPropsGoogle {
  emailgoogle: string;
  password?: string;
}

export async function logingoogle(userData: IloginPropsGoogle) {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  console.log("Sending login data:", userData);

  try {
    const ResLogin = await fetch(`${APIURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.emailgoogle,
        password: userData.password,
      }),
    });

    if (ResLogin.ok) {
      const data = await ResLogin.json();
      console.log("Login success:", data);
      return { success: true, data };
    } else {
      const errorData = await ResLogin.json();
      console.log("Login failed:", errorData);
      return { success: false, errorData };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error };
  }
}

const LoginGoogle: React.FC<IloginPropsGoogle> = ({ emailgoogle, password }) => {
  const router = useRouter();
  const { setUserData } = useLoggin();

  const [dataUser, setDataUser] = useState({ emailgoogle: "", password: "" });
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (emailgoogle && password) {
      setDataUser({ emailgoogle, password });
      setIsFormReady(true);
    }
  }, [emailgoogle, password]);

  const handleSubmitGoogle = useCallback(async () => {
    console.log("Email:", dataUser.emailgoogle);
    console.log("Password:", dataUser.password);

    try {
      const response = await logingoogle(dataUser);

      if (response.success) {
        const { token, user } = response.data;

        setUserData({
          token,
          userData: user,
        });

        router.push("/");
      } else {
        console.log("Login failed:", response.errorData);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            response.errorData?.message || "Tus credenciales no son correctas.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al iniciar sesión.",
      });
    }
  }, [dataUser, setUserData, router]);

  useEffect(() => {
    if (isFormReady) {
      handleSubmitGoogle();
    }
  }, [handleSubmitGoogle, isFormReady]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-center text-gray-800 drop-shadow-lg">
        Iniciar sesión con Google
      </h1>
      <p className="text-xl text-center text-gray-600 drop-shadow-md mt-4">
        Bienvenido
      </p>
      <p className="text-xl text-center text-gray-600 drop-shadow-md mt-2">
        HOTEL Y RESORT DE LUJO ELYSIUM
      </p>
    </div>
  );
};

export default LoginGoogle;
