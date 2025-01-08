import ProtectedAdmin from "@/components/ProtectedAdmin/page";
import TestimonialsPage from "@/components/Testimonials";

import React from "react";

const page = () => {
  return (
    <div>
      <ProtectedAdmin>
        <TestimonialsPage />
      </ProtectedAdmin>
    </div>
  );
};

export default page;
