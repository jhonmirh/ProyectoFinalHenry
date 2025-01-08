// 'use client';

// import RegisterGoogle from '@/components/RegisterGoogle/RegisterGoogle';
// import { useSearchParams } from 'next/navigation';
// import React from 'react';


// const RegisterGooglePage = () => {
//   const searchParams = useSearchParams();
//   const name = searchParams?.get("name") || "";
//   const emailgoogle = searchParams?.get("email") || "";

//   if (!name || !emailgoogle) {
//     return <p>Error: Falta información para el registro.</p>;
//   }

//   return (
//     <div>
//       <h1>Estas iniciando Sesíón desde Google</h1>
//       <p>Nombre: {name}</p>
//       <p>Email: {emailgoogle}</p>
//       <p>
//         Ahora puedes usar tu cuenta de Google para registrarte en nuestra plataforma. <br />
//         Completa tu Registro con tus datos personales.
//       </p>
//       <RegisterGoogle name={name} emailgoogle={emailgoogle} />
//     </div>
//   );
// };

// export default RegisterGooglePage;



'use client';

import RegisterGoogle from '@/components/RegisterGoogle/RegisterGoogle';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const RegisterGooglePage = () => {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name") || "";
  const emailgoogle = searchParams?.get("email") || "";

  useEffect(() => {
    if (name && emailgoogle) {
      Swal.fire({
        title: '<h1>Estas iniciando Sesión desde Google</h1>',
        html: `
          <p> ${name}</p>
          <p>Tu Email: ${emailgoogle}</p>
          <p>
            Ahora puedes usar tu cuenta de Google para registrarte en nuestra plataforma. <br />
            Completa tu Registro con tus datos personales Numero Telefónico y DnI.
          </p>
        `,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        customClass: {
          title: 'text-grisOscuro',
          htmlContainer: 'text-grisClaro',
          confirmButton: 'bg-mostaza text-white hover:bg-beige',
        },
      });
    }
  }, [name, emailgoogle]);

  if (!name || !emailgoogle) {
    return <p>Error: Falta información para el registro.</p>;
  }

  return (
    <div>
      <RegisterGoogle name={name} emailgoogle={emailgoogle} />
    </div>
  );
};

export default RegisterGooglePage;
