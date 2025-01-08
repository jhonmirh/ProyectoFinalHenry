"use client";
import Image from "next/image";
import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Branches from "@/app/branches/Branches";


const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const validateField = (name: string, value: string): string => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "El nombre es requerido";
        else if (!regexName.test(value))
          error = "El nombre debe contener solo letras y espacios";
        break;
      case "email":
        if (!value) error = "El correo electrónico es requerido";
        else if (!regexEmail.test(value.trim()))
          error = "Por favor, ingresa un correo electrónico válido";
        break;
      case "message":
        if (!value || value.length < 10)
          error = "El mensaje debe tener al menos 10 caracteres";
        break;
      default:
        break;
    }
    return error;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setTimeout(() => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }, 300);
  };
  const validateForm = (): boolean => {
    const newErrors = { name: "", email: "", message: "" };
    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
    } else if (!regexName.test(formData.name)) {
      newErrors.name = "El nombre debe contener solo letras y espacios";
    }
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!regexEmail.test(formData.email.trim())) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido";
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);


    // const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
    // const YOUR_TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    // const YOUR_USER_ID = process.env.NEXT_PUBLIC_USER_ID;


    const YOUR_SERVICE_ID = 'service_clpikcu';
    const YOUR_TEMPLATE_ID = 'template_7n7m164';
    const YOUR_USER_ID = '5sj5rQFeGjN3K-g-D';


    if (!YOUR_SERVICE_ID || !YOUR_TEMPLATE_ID || !YOUR_USER_ID) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Faltan configuraciones de correo. Contacta al administrador.",
        confirmButtonColor: "#d33",
      });
      setLoading(false);
      return;
    }
    try {
      await emailjs.send(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        formData,
        YOUR_USER_ID
      );


      Swal.fire({
        icon: "success",
        title: "¡Correo enviado!",
        html: `Tu mensaje ha sido enviado con éxito.<br>Pronto te responderemos a  ${formData.email}`,
        confirmButtonColor: "#3085d6",
      });
      
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar tu mensaje. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
      console.error("Error al enviar el correo:", error);
    } finally {
      setLoading(false);
    }
  };
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.message &&
      Object.values(errors).every((error) => error === "")
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex justify-center items-center">
        <div className="flex bg-beige justify-center items-center p-[4rem] gap-10">
          <div className="flex flex-col lg:flex-row p-2 rounded-lg space-y-8 lg:space-y-0 lg:space-x-8 max-w-4xl">
            <div className="flex-1 max-w-md">
              <span className="font-primary text-mostaza uppercase">
                Elysium
              </span>
              <h6 className="font-primary text-[2.5rem] text-grisOscuro">
                CONTACTENOS
              </h6>
              <p className="my-6">
                Estamos aquí para ayudarte. No dudes en ponerte en contacto con
                nosotros para cualquier consulta, reserva o comentario. <br />
                Nuestro equipo está disponible para brindarte la mejor atención
                y asegurar que tu experiencia con nosotros sea inolvidable.
              </p>
              <div className="flex items-center border-b-1 border-mostaza py-4">
                <Image
                  src="/saul/phone-call.svg"
                  alt="Teléfono"
                  width={24}
                  height={24}
                />
                <span className="text-grisOscuro font-secondary ml-4">
                  555 123 456789
                </span>
              </div>
              <div className="flex items-center border-b-1 border-mostaza py-4">
                <Image
                  src="/saul/mail.svg"
                  alt="Correo electrónico"
                  width={24}
                  height={24}
                />
                <span className="text-grisOscuro font-secondary ml-4">
                  example@gmail.com
                </span>
              </div>
              <div className="flex items-center py-4">
                <Image
                  src="/saul/location.svg"
                  alt="Dirección"
                  width={24}
                  height={24}
                />
                <span className="text-grisOscuro font-secondary ml-4">
                  Calle falsa 123, Nº 789
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-[35rem] bg-grisOscuro min-h-[300px] text-white p-8 rounded-lg transition-all duration-300 ease-in-out">
            <h2 className="text-[2.5rem]">CONSULTANOS</h2>
            <form
              className="my-4 space-y-4 font-secondary text-grisOscuro"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre Completo"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white placeholder-gray-400 focus:ring-2 focus:outline-none ${
                    errors.name ? "border-red-500" : "focus:ring-mostaza"
                  }`}
                  required
                />
                <p className="text-red-500 text-sm h-5">{errors.name || " "}</p>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white placeholder-gray-400 focus:ring-2 focus:outline-none ${
                    errors.email ? "border-red-500" : "focus:ring-mostaza"
                  }`}
                  required
                />
                <p className="text-red-500 text-sm h-5">
                  {errors.email || " "}
                </p>
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Escribir mensaje"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white placeholder-gray-400 focus:ring-2 focus:outline-none ${
                    errors.message ? "border-red-500" : "focus:ring-mostaza"
                  }`}
                  required
                ></textarea>
                <p className="text-red-500 text-sm h-5">
                  {errors.message || " "}
                </p>
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full p-3 transition duration-300 ${
                  !isFormValid()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-mostaza hover:bg-opacity-70"
                }`}
              >
                {loading ? "Enviando..." : "ENVIAR MENSAJE"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Branches />
    </div>
  );
};

export default ContactForm;
