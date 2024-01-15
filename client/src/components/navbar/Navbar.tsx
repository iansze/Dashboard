import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import Menu from "../menu/Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { instance, requests } from "../../utils/axios";
import { setCurrentMember } from "../../redux/feature/memberSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMediumScreen = useMediaQuery("(min-width: 1024px)");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const currentMember = useSelector((state: RootState) => state.member.currentMember);

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

  const signOutHandler = () => {
    instance.get(requests.logout).then(() => {
      dispatch(setCurrentMember(null));
    });
    navigate("/");
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
          <Link to="/">
            <h1>DashBoard</h1>
          </Link>
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
          {currentMember ? <span>1</span> : ""}
        </div>

        <div className="navbar__account">
          <div className="navbar__account-container">
            <p className="navbar__account-name">{currentMember ? currentMember.membername : ""}</p>
          </div>

          {currentMember ? (
            <button className="navbar__account-button" onClick={signOutHandler}>
              Sign Out{" "}
            </button>
          ) : (
            <button className="navbar__account-button" onClick={() => navigate("/login")}>
              Login{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
