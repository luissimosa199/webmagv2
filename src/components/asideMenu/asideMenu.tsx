import Image from "next/image";
import { type FunctionComponent } from "react";
import AsidePosts from "../asidePosts/asidePosts";
import Link from "next/link";

interface AsideMenuProps {
  handleToggle: () => void;
}

const AsideMenu: FunctionComponent<AsideMenuProps> = ({ handleToggle }) => {
  return (
    <div className="fixed -top-0 -right-0 z-10 flex h-screen w-full max-w-lg flex-col overflow-y-auto bg-white p-4 text-xl font-semibold lg:w-[70%]">
      <button className="mb-2 self-end" onClick={handleToggle}>
        <Image
          width={24}
          height={24}
          src="https://img.icons8.com/material-outlined/24/null/multiply--v1.png"
          alt="Close Menu Button"
        />
      </button>
      <ul className="mb-8 flex flex-col gap-1">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link target="_blank" href="https://lumedia.vercel.app/about">Sobre Nosotros</Link>
        </li>
        <li>
          <Link target="_blank" href="https://lumedia.vercel.app/contact">Trabaja con nosotros</Link>
        </li>
        <li>
          <Link target="_blank" href="https://lumedia.vercel.app/contact">Publicidad</Link>
        </li>
        <li>
          <Link target="_blank" href="https://lumedia.vercel.app/contact">Contacto</Link>
        </li>
      </ul>

      <div>
        <h2 className="mb-2">Publicaciones recientes</h2>
        <AsidePosts />
      </div>
    </div>
  );
};

export default AsideMenu;
