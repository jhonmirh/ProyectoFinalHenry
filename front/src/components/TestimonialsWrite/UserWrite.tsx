"use client";
import React, { useState, useEffect } from "react";
import { validateTestimonials } from "@/helpers/validatetestimonials";
import { useLoggin } from "@/context/logginContext";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "emailjs-com"; // Importar EmailJS
import Image from "next/image"; // Importar Image de next/image

interface TestimonialFormData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

const TestimonialForm = () => {
  const { userData } = useLoggin();
  const [form, setForm] = useState<TestimonialFormData>({
    name: userData?.userData.name || "",
    email: userData?.userData.email || "",
    message: "",
    rating: 0,
  });

  const [errors, setErrors] = useState<Partial<TestimonialFormData>>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
    rating: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rating" ? parseInt(value, 10) || 0 : value,
    });

    const validationErrors: Partial<TestimonialFormData> = validateTestimonials({
      ...form,
      [name]: name === "rating" ? parseInt(value, 10) || 0 : value,
    });
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0 && form.rating > 0);
  };

  const handleStarClick = (value: number) => {
    setForm((prev) => ({
      ...prev,
      rating: Number(value), // Convertir a número
    }));
    setIsValid(Object.keys(errors).length === 0 && value > 0);
  };

  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Partial<TestimonialFormData> = validateTestimonials(form);
    if (!form.rating) {
      validationErrors.rating = "Debes seleccionar una calificación." as unknown as number;
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`${APIURL}/testimonials`, form, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        });

        await emailjs.send(
          "service_clpikcu",
          "template_v4ea3gi",
          {
            user_name: form.name,
            user_email: form.email,
            user_message: form.message,
            user_rating: form.rating,
          },
          "5sj5rQFeGjN3K-g-D"
        );

        Swal.fire({
          title: "Éxito",
          text: "Testimonio enviado con éxito y correo enviado al usuario.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        setForm({
          name: userData?.userData.name || "",
          email: userData?.userData.email || "",
          message: "",
          rating: 0,
        });
        setTouched({
          name: false,
          email: false,
          message: false,
          rating: false,
        });
      } catch (error) {
        console.log(error);
        
        Swal.fire({
          title: "Error",
          text: "Hubo un error al enviar el testimonio o el correo. Intenta nuevamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const validationErrors: Partial<TestimonialFormData> = validateTestimonials(form);
    if (!form.rating) {
      validationErrors.rating = "Debes seleccionar una calificación." as unknown as number;
    }
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0 && form.rating > 0);
  }, [form]);

 
  return (
    <div className="w-full h-screen flex items-center justify-center p-2">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-5">
        <div className="w-full md:w-2/5">
          <Image src="/fondo3.png" alt="Testimonios" width={700} height={700} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/5"
        >
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold mb-2">{userData?.userData.name}</h2>
            <h2 className="text-2xl font-bold">Crea Tu Testimonio en Elysium</h2>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Escribe tu nombre"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Escribe tu correo electrónico"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-semibold">
              Testimonio
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Escribe tu testimonio aquí..."
            ></textarea>
            {touched.message && errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Clasifica Tu Estadia en Elysium</h3>
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <svg
                  key={value}
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-8 h-8 cursor-pointer ${
                    (hoveredRating || form.rating) >= value ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            {touched.rating && errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full bg-mostaza text-white py-2 rounded-md ${
              !isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-grisClaro"
            }`}
          >
            Enviar Testimonio
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
