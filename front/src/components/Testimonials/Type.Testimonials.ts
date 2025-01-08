export interface Testimonial {
    id: string;
    username: string;
    email: string;
    testimonial: string;
    status: string;
  }
  
export  interface TestimonialModalProps {
    testimonial: Testimonial;
    onClose: () => void;
    onStatusChange: (id: string, status: string) => void;
  }

 export interface TestimonialCardProps {
    testimonial: Testimonial;
    onDelete: (id: string) => void;
    onClick: (testimonial: Testimonial) => void;
    onStatusChange: (id: string, status: string) => void;
  }