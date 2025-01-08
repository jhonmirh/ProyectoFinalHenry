import React from "react";
import UserWrite from "@/components/TestimonialsWrite/UserWrite";
import ProtectedClient from "@/components/ProtectedClient/page";

const page = () => {
  return (
    <div>
      <ProtectedClient>
        <UserWrite />
      </ProtectedClient>
    </div>
  );
};

export default page;
