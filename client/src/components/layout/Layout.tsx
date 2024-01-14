import { Outlet } from "react-router-dom";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import useMediaQuery from "../../hooks/useMediaQuery";

const Layout = () => {
  const isMediumScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="main">
      <Navbar />
      <div className="wrapper">
        <div className="container">
          {isMediumScreen ? (
            <div className="menuContainer">
              <Menu />
            </div>
          ) : null}
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
