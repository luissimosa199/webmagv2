import Link from "next/link";

const CAT_1 = process.env.NEXT_PUBLIC_CAT_1;
const CAT_2 = process.env.NEXT_PUBLIC_CAT_2;
const CAT_3 = process.env.NEXT_PUBLIC_CAT_3;

const NavBar = () => {
  return (
    <nav className="h-full">
      <ul className="flex h-full">
        <li className="border-collapse cursor-pointer border px-3 leading-[3.5rem] hover:opacity-75">
          <Link href="/novedades">Novedades</Link>
        </li>
        <li className="border-collapse cursor-pointer border px-3 leading-[3.5rem] hover:opacity-75">
          <Link href="/popular">Popular</Link>
        </li>
        <li className="border-collapse cursor-pointer border border-b-4 border-b-yellow-300 px-3 capitalize leading-[3.5rem] hover:text-yellow-700 hover:opacity-75">
          <Link href={`/cat/${CAT_1 as string}`}>{CAT_1}</Link>
        </li>
        <li className="border-collapse cursor-pointer border border-b-4 border-b-emerald-600 px-3 capitalize leading-[3.5rem] hover:text-emerald-700 hover:opacity-75">
          <Link href={`/cat/${CAT_2 as string}`}>{CAT_2}</Link>
        </li>
        <li className="border-collapse cursor-pointer border border-b-4 border-b-blue-600 px-3 capitalize leading-[3.5rem] hover:text-blue-700 hover:opacity-75">
          <Link href={`/cat/${CAT_3 as string}`}>{CAT_3}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
