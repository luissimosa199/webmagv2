import { type FunctionComponent, type ReactNode, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import AsideMenu from "../asideMenu/asideMenu";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    if (toggleMenu) {
      setToggleMenu(false);
      return;
    }
    setToggleMenu(true);
    return;
  };

  return (
    <>
      <Header handleToggle={() => {handleToggle()}} toggleMenu={toggleMenu} />
      {toggleMenu && (
        <AsideMenu handleToggle={handleToggle}/>
      )}
      <main className={toggleMenu ? "blur-sm" : ""}>{children}</main>
      <Footer toggleMenu={toggleMenu} />
    </>
  );
};

export default MainLayout;
