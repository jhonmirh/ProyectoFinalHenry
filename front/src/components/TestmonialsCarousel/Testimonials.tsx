"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useLoggin } from "@/context/logginContext";

interface Testimonial {
  testimonial: string;
  username: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { userData } = useLoggin();
  const token = userData?.token;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/testimonials/published`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [APIURL, token]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 
    return () => clearInterval(interval);
  }, [nextSlide]);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ].filter(Boolean);

  return (
    <section className="py-8">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-[3rem]">Testimonios</h2>
          <p>
            Descubre como nuestros huéspedes han vivido experiencias
            inolvidables con nosotros.
          </p>
        </div>

        <div className="relative">

          <div className="flex justify-center gap-6 overflow-hidden">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white border-2 border-mostaza shadow-lg shadow-beige rounded-lg p-6 w-72"
                style={{
                  opacity: index === 1 ? 1 : 0.5, 
                  transform: index === 1 ? "scale(1)" : "scale(0.9)",
                  transition: "opacity 0.3s ease, transform 0.3s ease", 
                }}
              >
                <div className="relative w-full h-2 bg-mostaza rounded mb-4"></div>
                <div className="absolute top-1 right-1 text-grisOscuro text-2xl">
                  <Image
                    src="/pluma.svg"
                    alt="Cliente Feliz"
                    width={30}
                    height={30}
                    className="mb-4"
                  />
                </div>
                <p className="font-bold text-base mt-4 text-grisOscuro">
                  - {testimonial.username}
                </p>
                <p className="italic text-grisOscuro">
                  {testimonial.testimonial}
                </p>
                
                <p className="text-sm text-gray-500">
                  Rating: {testimonial.rating}⭐
                </p>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
            <button
              onClick={prevSlide}
              className="bg-mostaza text-white p-3 rounded-full shadow-md hover:bg-opacity-70 transition"
            >
              &#9664;
            </button>
            <button
              onClick={nextSlide}
              className="bg-mostaza text-white p-3 rounded-full shadow-md hover:bg-opacity-70 transition"
            >
              &#9654;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
