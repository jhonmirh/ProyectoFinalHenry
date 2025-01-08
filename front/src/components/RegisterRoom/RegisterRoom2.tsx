"use client";

import { useState } from "react";
import {
  validateTitle,
  validateDescription,
  validateSize,
  validateBeds,
  validateRating,
  validatePrice,
  validateImage,
  validateRoomType,
} from "@/helpers/validateNewRoom";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import FileUploader from "./FileUploader";
import GuestsInput from "./GuestsInput";
import RoomList from "./RoomList";

const RegisterForm = () => {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    size: "",
    beds: "",
    rating: "",
    image: "",
    price: "",
    roomType: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    size: "",
    beds: "",
    rating: "",
    image: "",
    price: "",
    roomType: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }));
  };
  const validateInput = (name: string, value: string) => {
    switch (name) {
      case "title":
        return validateTitle(value);
      case "size":
        return validateSize(value);
      case "beds":
        return validateBeds(Number(value));
      case "rating":
        return validateRating(Number(value));
      case "image":
        return validateImage(value);
      case "price":
        return validatePrice(Number(value));
      case "roomType":
        return validateRoomType(value);
      case "description":
        return validateDescription(value);
      default:
        return "";
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((value) => value !== "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Formulario inválido",
        text: "Por favor, corrige los errores antes de enviar.",
      });
      return;
    }

    try {
      const datosParaEnviar = {
        ...formData,
        beds: parseInt(formData.beds, 10),
        rating: parseFloat(formData.rating),
        price: parseFloat(formData.price)
      };

      console.log("Datos a enviar:", datosParaEnviar);
      const response = await fetch(`${APIURL}/rooms/registerRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosParaEnviar),
      });

      if (!response.ok) {
        const datosError = await response.json();
        throw new Error(datosError.message || "No se pudo registrar la habitación.");
      }

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        timer: 1500,
      }).then(() => router.push("/"));
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "Intenta nuevamente más tarde.",
      });
    }
  };
  
  return (
    <>
      <form
  onSubmit={handleSubmit}
  className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md grid grid-cols-2 gap-6"
>

  <div className="flex flex-col gap-6">
    <div>
      <label className="block text-gray-600 text-lg font-medium">Imagen</label>
      <FileUploader
        onFileUpload={(fileUrl) =>
          setFormData((prev) => ({ ...prev, image: fileUrl }))
        }
      />
      <p
        className={`text-red-500 text-xs mt-1 ${errors.image ? "" : "invisible"}`}
      >
        {errors.image}
      </p>
    </div>

    <div>
      <label className="block text-gray-600 text-lg font-medium">Descripción</label>
      <textarea
        name="description"
        placeholder="Información de la habitación"
        value={formData.description}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-gray-400 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 h-32"
      />
      <p
        className={`text-red-500 text-xs mt-1 ${
          errors.description ? "" : "invisible"
        }`}
      >
        {errors.description}
      </p>
    </div>
    <div>
      <label className="block text-gray-600 text-lg font-medium">Capacidad</label>
      <GuestsInput
        maxGuests={8}
        initialGuests={parseInt(formData.beds, 10) || 0}
        onGuestsChange={(value) =>
          setFormData((prev) => ({ ...prev, beds: value.toString() }))
        }
      />
      <p
        className={`text-red-500 text-xs mt-1 ${errors.beds ? "" : "invisible"}`}
      >
        {errors.beds}
      </p>
    </div>
  </div>


  <div className="flex flex-col gap-6">
    <div>
      <label className="block text-gray-600 text-lg font-medium">Título</label>
      <input
        name="title"
        placeholder="Nombre de la habitación"
        value={formData.title}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2"
      />
      <p
        className={`text-red-500 text-xs mt-1 ${
          errors.title ? "" : "invisible"
        }`}
      >
        {errors.title}
      </p>
    </div>

    <div>
      <label className="block text-gray-600 text-lg font-medium">Categoría</label>
      <select name="roomType" id="" className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2">
        <option value="">seleccionar una categoría</option>
        <option value="luxury">Habitación de lujo</option>
        <option value="standard">Habitación estándar</option>
        <option value="suite">Suite</option>
        <option value="family">Habitación familiar deluxe</option>
      </select>
      <p
        className={`text-red-500 text-xs mt-1 ${
          errors.roomType ? "" : "invisible"
        }`}
      >
        {errors.roomType}
      </p>
    </div>

    <div>
      <label className="block text-gray-600 text-lg font-medium">Tamaño</label>
      <div className="flex items-center gap-2">
        <input
          name="size"
          placeholder="Tamaño en m2"
          value={formData.size}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2"
        />
      </div>
      <p
        className={`text-red-500 text-xs mt-1 ${errors.size ? "" : "invisible"}`}
      >
        {errors.size}
      </p>
    </div>

    

    <div>
      <label className="block text-gray-600 text-lg font-medium">Puntuación</label>
      <input
        name="rating"
        placeholder="Rating del 0 al 5"
        value={formData.rating}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2"
      />
      <p
        className={`text-red-500 text-xs mt-1 ${
          errors.rating ? "" : "invisible"
        }`}
      >
        {errors.rating}
      </p>
    </div>

    <div>
      <label className="block text-gray-600 text-lg font-medium">Precio por noche</label>
      <input
        name="price"
        placeholder="Precio por noche Usd."
        value={formData.price}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2"
      />
      <p
        className={`text-red-500 text-xs mt-1 ${
          errors.price ? "" : "invisible"
        }`}
      >
        {errors.price}
      </p>
    </div>
  </div>


  <div className="col-span-2 flex justify-center mt-8">
    <button
      type="submit"    >
      Registrar
    </button>
  </div>
</form>
      <RoomList />
    </>
  );
};

export default RegisterForm;
