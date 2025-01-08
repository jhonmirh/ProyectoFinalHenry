import ProtectedAdmin from "@/components/ProtectedAdmin/page";
import RegisterForm from "@/components/RegisterRoom/RegisterRoom2";

const page = () => {
  return (
    <ProtectedAdmin>
      <div className="min-h-[75vh] pt-10">
        <h1 className="flex justify-center text-2xl pb-4">
          Gestión de alojamientos
        </h1>
        <RegisterForm />
      </div>
    </ProtectedAdmin>
  );
};

export default page;
