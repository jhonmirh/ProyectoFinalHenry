import { TestimonialModalProps } from "./Type.Testimonials";

const TestimonialModal = ({ testimonial, onClose, onStatusChange }: TestimonialModalProps) => {
  const { username, email, testimonial: message, status, id } = testimonial;

  const handleStatusToggle = () => {
    const newStatus = status === "Pendiente" ? "Publicado" : "Pendiente";
    onStatusChange(id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold">Detalles del Testimonio</h3>
        <div className="mt-4">
          <p><strong>Nombre:</strong> {username}</p>
          <p><strong>Correo:</strong> {email}</p>
          <p><strong>Mensaje:</strong> {message}</p>
        </div>
        <div className="mt-4">
          <button
            onClick={handleStatusToggle}
            className={`px-4 py-2 rounded-lg ${
              status === "Pendiente" ? "bg-red-500" : "bg-grisOscuro"
            } text-white`}
          >
            Cambiar a {status === "Pendiente" ? "Publicado" : "Pendiente"}
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-2 w-full bg-mostaza text-white px-4 py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TestimonialModal;
