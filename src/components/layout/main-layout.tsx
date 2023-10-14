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
      <Header
        handleToggle={() => {
          handleToggle();
        }}
        toggleMenu={toggleMenu}
      />
      {toggleMenu && <AsideMenu handleToggle={handleToggle} />}
      {toggleMenu && (
        <span
          onClick={() => {
            if (toggleMenu) setToggleMenu(false);
          }}
          className=" fixed top-0 w-screen h-screen z-40"
        ></span>
      )}
      <main className={toggleMenu ? "blur-sm select-none z-30" : ""}>
        {children}
      </main>
      <Footer toggleMenu={toggleMenu} />
    </>
  );
};

export default MainLayout;
