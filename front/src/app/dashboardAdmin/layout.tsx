import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <header className="p-4 bg-black text-white text-center fixed top-16 left-0 w-full z-10">
        <h1 className="text-2xl font-bold">Dashboard de Administrador</h1>
      </header> */}
      <div className="flex flex-col min-h-screen pt-16">
        <div className="flex flex-1 bg-gray-100">

          <main className="flex-1 p-4 bg-gray-100 overflow-y-auto ml-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
