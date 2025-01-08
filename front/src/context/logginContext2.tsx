"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { userSession } from "@/interfaces/Types.session";

export interface LogginContextProps {
  userData: userSession | null;
  setUserData: (userData: userSession | null) => void;
  loadUserData: () => Promise<userSession | null>;
}

export const LogginContext = createContext<LogginContextProps>({
  userData: null,
  setUserData: () => {},
  loadUserData: async () => null,
});

export interface LogginProviderProps {
  children: React.ReactNode;
}

export const LogginProvider: React.FC<LogginProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userSession | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("sessionStart");
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          if (!userData || userData.token !== parsedData.token) {
            setUserData(parsedData);
          }
        } catch (error) {
          console.error("Error parsing session data:", error);
          localStorage.removeItem("sessionStart");
        }
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "sessionStart",
        JSON.stringify({
          token: userData.token,
          userData: userData.userData,
        })
      );
    }
  }, [userData]);

  const loadUserData = async (): Promise<userSession | null> => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("sessionStart");
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
          return parsedData;
        } catch (error) {
          console.error("Error parsing session data:", error);
          setUserData(null);
          return null;
        }
      }
    }
    return null;
  };

  return (
    <LogginContext.Provider value={{ userData, setUserData, loadUserData }}>
      {children}
    </LogginContext.Provider>
  );
};

export const useLoggin = () => useContext(LogginContext);
