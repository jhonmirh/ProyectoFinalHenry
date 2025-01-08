import React from "react";
import UserListWithReservations from "@/components/UserListWithReservations/UserListWithReservations";
import ProtectedAdmin from "@/components/ProtectedAdmin/page";

const page = () => {
  return (
    <ProtectedAdmin>
      <UserListWithReservations />
    </ProtectedAdmin>
  );
};

export default page;
