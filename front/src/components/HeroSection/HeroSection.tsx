"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <section
      className="bg-cover bg-center h-screen flex items-center justify-center text-center"
      style={{ backgroundImage: "url(/fondo3.png)" }}
    >
      <div className="bg-black bg-opacity-50 p- rounded-lg max-w-4xl mx-auto p-8">
        <h2
          className="text-[1.5rem] text-white"
          style={{ textShadow: "2px 2px 4px rgb(182, 150, 99)" }}
        >
          Hotel y Resort de Lujo
        </h2>
        <h1
          className="text-white text-[3rem] uppercase my-6"
          style={{ textShadow: "2px 2px 4px rgba(217, 119, 6, 1)" }}
        >
          Vive una Experiencia Única en ELYSIUM
        </h1>

        <motion.button
          className="bg-mostaza border-mostaza uppercase text-white py-2 px-4 hover:bg-opacity-70 transition-all"
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowMessage(!showMessage)}
        >
          Saber más
        </motion.button>

        {showMessage && (
          <motion.div
            className="mt-6 p-4 text-xl rounded-lg bg-white shadow-lg border-4 border-marronclaro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-grisOscuro font-secondary">
              El hotel perfecto. Si buscas unas vacaciones perfectas y recuerdos
              inolvidables, estás en el lugar indicado. Planifiquemos una
              estancia a tu medida, con los mejres Servicios, Atención en
              Habitación, Spa, Gimnasio, Peluqueria Profesional, Desayunos
              Buffet, la mejor Seguridad y mucho mas.
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
