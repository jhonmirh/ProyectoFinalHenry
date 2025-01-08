import ProtectedSesionIniciada from "@/components/ProtectedSesionIniciada/page";
import RegisterComponent from "@/components/RegisterComponent/RegisterComponent";

export const Register = () => {
  return (
    <ProtectedSesionIniciada>
      <section>
        <RegisterComponent />
      </section>
    </ProtectedSesionIniciada>
  );
};

export default Register;
