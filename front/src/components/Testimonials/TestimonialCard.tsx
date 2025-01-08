import { TestimonialCardProps } from "./Type.Testimonials";



const TestimonialCard = ({ testimonial, onDelete, onClick, onStatusChange }: TestimonialCardProps) => {
  const { id, username, email, testimonial: message, status } = testimonial;



  const handleStatusToggle = () => {
    const newStatus = status === "Pendiente" ? "Publicado" : "Pendiente";
    onStatusChange(id, newStatus);
  };

console.log(handleStatusToggle);


  return (
    <div className="p-4 border rounded-lg shadow-md shadow-mostaza flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{username}</h3>
        <p className="text-grisOscuro">{email}</p>
        <p className="text-sm">{message}</p>
        <span
          className={`px-3 py-1 rounded-full text-white ${
            status === "Pendiente" ? "bg-red-500" : "bg-mostaza"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onClick(testimonial)}
          className="bg-mostaza text-white px-4 py-2 rounded-lg"
        >
          Revisar
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;
