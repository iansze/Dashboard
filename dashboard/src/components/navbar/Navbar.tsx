import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__name">DashBoard</div>
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
