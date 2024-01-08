import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import Menu from "../menu/Menu";

const Navbar = () => {
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsBurgerMenuOpen(open);
  };

  return (
    <div className="navbar">
      <div className="navbar__name">
        {!isMediumScreen ? (
          <>
            <Button onClick={toggleDrawer(true)} color="inherit">
              <FontAwesomeIcon icon={faBars} size="2xl" />
            </Button>
            <Drawer open={isBurgerMenuOpen} onClose={toggleDrawer(false)}>
              <div className="burgerContainer">
                <Menu />
              </div>
            </Drawer>
          </>
        ) : (
          <h1>DashBoard</h1>
        )}
      </div>
      <div className="navbar__icons">
        <div className="navbar__icons-container">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          <FontAwesomeIcon icon={faTableCells} size="lg" />
          <FontAwesomeIcon icon={faExpand} size="lg" />
        </div>
        <div className="navbar__icons-container-notification">
          <FontAwesomeIcon icon={faBell} size="lg" />
          <span>1</span>
        </div>

        <div className="navbar__account">
          <div className="navbar__account-container">
            <img src="/src/assets/icon.ico" alt="icon" className="" />
            <p className="account">Ian</p>
          </div>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
