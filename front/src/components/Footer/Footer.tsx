import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-grisOscuro py-2">
      <div className="container mx-auto text-center">
        <div className="flex justify-between border-b-1 border-mostaza py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/saul/location.svg"
              alt="Dirección"
              width={40}
              height={40}
            />
            <div className="flex flex-col items-start">
              <h3 className="text-white uppercase">Dirección</h3>
              <span className="font-secondary text-grisClaro">
                Ejemplo de ubicación
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/saul/phone-call.svg"
              alt="Teléfono"
              width={40}
              height={40}
            />
            <div className="flex flex-col items-start">
              <h3 className="text-white uppercase">Comunicate con Nosotros</h3>
              <span className="font-secondary text-grisClaro">
                555-555-5555
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image src="/saul/mail.svg" alt="Email" width={40} height={40} />
            <div className="flex flex-col items-start">
              <h3 className="text-white uppercase">Consultas y reservas</h3>
              <span className="font-secondary text-grisClaro">
                proyectohenrypt21b@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div className="m-2">
          <h4 className="text-white uppercase">Síguenos en Nuestras Redes</h4>

          <div className="flex justify-center align-center gap-6 my-2">
            <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
              <Link href="https://www.facebook.com">
                {/* <div className="flex flex-col items-center"> */}
                {/* <div className="hover:scale-110 transition-transform duration-200"> */}
                <Image
                  src="/saul/facebook.svg"
                  alt="Facebook"
                  width={40}
                  height={40}
                />
                {/* </div> */}
                {/* <span className="mt-1 hover:text-marron">Facebook</span> */}
                {/* </div> */}
              </Link>
            </div>
            <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
              <Link href="https://www.twitter.com">
                {/* <div className="flex flex-col items-center"> */}
                {/* <div className="hover:scale-110 transition-transform duration-200"> */}
                <Image
                  src="/saul/twitter.svg"
                  alt="Twitter"
                  width={40}
                  height={40}
                />
                {/* </div> */}
                {/* <span className="mt-1 hover:text-marron">X</span> */}
                {/* </div> */}
              </Link>
            </div>

            <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
              <Link href="https://www.linkedin.com">
                {/* <div className="flex flex-col items-center"> */}
                {/* <div className="hover:scale-110 transition-transform duration-200"> */}
                <Image
                  src="/saul/linkedin.svg"
                  alt="LinkedIn"
                  width={40}
                  height={40}
                />
                {/* </div> */}
                {/* <span className="mt-1 hover:text-marronclaro">LinkedIn</span> */}
                {/* </div> */}
              </Link>
            </div>
          </div>
        </div>

        <div></div>
        <span className="text-mostaza font-secondary">
          © 2024, Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
