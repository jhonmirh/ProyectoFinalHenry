// pages/login.tsx

import LoginForm from "@/components/Login/Login";
import ProtectedSesionIniciada from "@/components/ProtectedSesionIniciada/page";

const Login: React.FC = () => {
  return (
    <ProtectedSesionIniciada>
      <div className="flex m-auto">
        <LoginForm />
      </div>
    </ProtectedSesionIniciada>
  );
};

export default Login;
