"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Service = {
  name: string;
  icon: string;
  photos: string[];
  route: string;
};

const ServicesSection = () => {
  const [visibleService, setVisibleService] = useState<string | null>(null);

  const services: Service[] = [
    {
      name: "Desayuno Buffet",
      icon: "/breakfast.svg",
      photos: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
      route: "breakfast",
    },
    {
      name: "Gimnasio",
      icon: "/gym.svg",
      photos: ["/gym1.jpeg", "/gym2.jpeg", "/gym3.jpeg"],
      route: "gym",
    },
    {
      name: "Piscina",
      icon: "/swimming.svg",
      photos: ["/pool1.jpeg", "/pool2.jpeg", "/pool3.jpeg"],
      route: "swimming",
    },
    {
      name: "Peluquería",
      icon: "/hair.svg",
      photos: ["/hair1.jpg", "/hair2.jpg", "/hair3.jpg"],
      route: "hair",
    },
    {
      name: "Spa",
      icon: "/spa.svg",
      photos: ["/spa1.jpg", "/spa2.jpg", "/spa3.jpg"],
      route: "spa",
    },
    {
      name: "Servicio de habitación",
      icon: "/service.svg",
      photos: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
      route: "roomservice",
    },
  ];

  const handleMouseEnter = (name: string) => {
    setVisibleService(name);
  };

  const handleMouseLeave = () => {
    setVisibleService(null);
  };

  return (
    <section className="text-white bg-grisOscuro p-10">
      <div className="container mx-auto text-center">
        <div className="mb-[2rem]">
          <h2 className="text-[2.5rem] uppercase">Servicios Exclusivos</h2>
          <span className="font-secondary text-grisClaro">
            Cada momento, un servicio a tu medida. <br /> En nuestro hotel, nos
            aseguramos de que cada detalle de tu estancia sea perfecto.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.name}
              href={`/services/${service.route}`}
              className="relative flex flex-col items-center transition-transform duration-300 hover:scale-110 border border-grisClaro py-4 z-10"
              onMouseEnter={() => handleMouseEnter(service.name)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <Image
                  src={service.icon}
                  alt={service.name}
                  width={60}
                  height={60}
                  className="mb-2"
                />
              </div>
              <h3 className="text-[1rem]">{service.name}</h3>


              {visibleService === service.name && (
                <div
                  className={`absolute top-full mt-4 bg-grisOscuro p-4 shadow-lg ${
                    index === 0
                      ? "left-1/2 transform -translate-x-1/2 lg:left-0 lg:transform-none"
                      : index === services.length - 1
                      ? "right-1/2 transform translate-x-1/2 lg:right-0 lg:transform-none"
                      : "left-1/2 transform -translate-x-1/2"
                  }`}
                  style={{
                    boxShadow: "0 4px 15px rgb(182, 150, 99)",
                    maxWidth: "calc(100vw - 48px)",
                  }}
                >
                  <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4">
                    {service.photos.map((photo, photoIndex) => (
                      <div
                        key={photoIndex}
                        className="w-[250px] h-[150px] flex-shrink-0 overflow-hidden border-2 border-grisClaro"
                        style={{ width: "250px", height: "150px"}}
                      >
                        <Image
                          src={photo}
                          alt={`${service.name} Foto ${photoIndex + 1}`}
                          width={250}
                          height={150}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
