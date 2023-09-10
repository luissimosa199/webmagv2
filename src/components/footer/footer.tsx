import { type FunctionComponent } from "react";
import Logo from "../logo/logo";
import Link from "next/link";

interface FooterProps {
  toggleMenu: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({ toggleMenu }) => {
  return (
    <footer className={toggleMenu ? "p-3 blur-sm" : "p-3"}>
      <Logo />
      <div className="md:flex md:justify-around md:gap-4">
        <div className="mt-4 mb-4 text-gray-400">
          <div className="mb-4 flex gap-4 md:flex-col">
            <h2 className="font-semibold"><Link target="_blank" href="https://lumedia.vercel.app/privacy">Política de Privacidad</Link></h2>
            <h2 className="font-semibold"><Link target="_blank" href="https://lumedia.vercel.app/contact">Publicidad</Link></h2>
          </div>
          <p className="text-xs">© Copyright ©2023 | Luis Simosa</p>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold">Sobre Nosotros</h2>
          <ul className="font-semibold text-gray-400">
            <li className="mb-2"><Link target="_blank" href="https://lumedia.vercel.app/about">Sobre nosotros</Link></li>
            <li className="mb-2"><Link target="_blank" href="https://lumedia.vercel.app/contact">Trabaja con nosotros</Link></li>
            <li className="mb-2"><Link target="_blank" href="https://lumedia.vercel.app/contact">Contacto</Link></li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold">Categorías</h2>
          <ul className="font-semibold text-gray-400">
            <li>
              <Link href="/argentina">Argentina</Link>
            </li>
            <li>
              <Link href="/internacionales">Internacionales</Link>
            </li>
            <li>
              <Link href="/economia">Economía</Link>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold">
            Únete a nuestra lista de mensajes
          </h2>
          <form
            onSubmit={(e) => {
              void e.preventDefault();
              void alert("Suscrito!");
            }}
            className="relative"
          >
            <input
              type="text"
              className="w-full border-2 px-2 py-1 text-gray-400"
              placeholder="Introduce tu email"
            />
            <button
              type="submit"
              className="absolute -right-0 -top-1 mr-2 mt-2 rounded bg-yellow-300 px-2 py-1 text-sm uppercase transition-all hover:opacity-75"
            >
              Suscribete!
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
