'use client'; 

import { useLoggin } from "@/context/logginContext"; 
import React from "react";

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useLoggin(); 
  if (userData?.userData?.role?.name === "Administrador") {
    return <div>{children}</div>; 
  }

  return null; 
};
export default ShowComponent;
