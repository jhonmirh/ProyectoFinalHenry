// import { useLoggin } from "@/context/logginContext";
// import Link from "next/link";
// import Image from "next/image";
// import React, { useEffect} from "react";
// import CardUser from "./CardUser";
// import Switcher from "../Switcher";
// import ContadorVisitas from "../visits/visits";

// const Header = () => {
//   const { userData, setUserData } = useLoggin();

//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData");
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//     console.log('====================================');
//     console.log(userData);
//     console.log('====================================');
//   }, [userData]);

//   return (
//     <header className="sticky top-0 z-100 w-full h-[4.5rem] bg-grisOscuro text-white z-10 flex justify-between items-center px-6">
//       <div className="flex items-center">
//         <Link href="/">
//           <Image
//             src="/HE.png"
//             alt="Elysim"
//             width={120}
//             height={50}
//             className="hover:scale-105 transition-transform duration-200"
//           />
//         </Link>

//         <ContadorVisitas />
//       </div>
//       <nav className="flex items-center space-x-6 text-[1rem] uppercase">
//         <div className="flex space-x-6 text-[1rem] uppercase items-center">
//           <Link href="/" className="hover:text-mostaza">
//             Home
//           </Link>
//           <Link href="/rooms" className="hover:text-mostaza">
//             Habitaciones
//           </Link>
//           <Link href="/facilities" className="hover:text-mostaza">
//             Servicios
//           </Link>
//           <Link href="/contact" className="hover:text-mostaza">
//             Contacto
//           </Link>
//           <Link href="/nosotros" className="hover:text-mostaza">
//             Acerca de...
//           </Link>
//           <Switcher />
//         </div>
//       </nav>
//       <div className="space-x-4 flex items-center">
//         {userData?.token ? (
//           <CardUser />
//         ) : (
//           <>
//             <Link href="/login">
//               <button>Iniciar Sesión</button>
//             </Link>
//             <Link href="/register">
//               <button>Registrarse</button>
//             </Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

'use client'

import { useLoggin } from "@/context/logginContext"; 
import Link from "next/link";
import Image from "next/image";
import React from "react";
import CardUser from "./CardUser";
import Switcher from "../Switcher";
import ContadorVisitas from "../visits/visits";

const Header = () => {
  const { userData } = useLoggin();


  
  console.log(userData)

  return (
    <header className="sticky top-0 w-full h-[4.5rem] bg-grisOscuro text-white z-50 flex justify-between items-center px-6">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/HE.png"
            alt="Elysim"
            width={120}
            height={50}
            className="hover:scale-105 transition-transform duration-200"
          />
        </Link>

        <ContadorVisitas />
      </div>
      <nav className="flex items-center space-x-6 text-[1rem] uppercase">
        <div className="flex space-x-6 text-[1rem] uppercase items-center">
          <Link href="/" className="hover:text-mostaza">
            Home
          </Link>
          <Link href="/rooms" className="hover:text-mostaza">
            Habitaciones
          </Link>
          <Link href="/facilities" className="hover:text-mostaza">
            Servicios
          </Link>
          <Link href="/contact" className="hover:text-mostaza">
            Contacto
          </Link>
          <Link href="/nosotros" className="hover:text-mostaza">
            Acerca de...
          </Link>
          <Switcher />
        </div>
      </nav>
      <div className="space-x-4 flex items-center">
        {userData?.token ? (
          <CardUser />
        ) : (
          <>
            <Link href="/login">
              <button>Iniciar Sesión</button>
            </Link>
            <Link href="/register">
              <button>Registrarse</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
