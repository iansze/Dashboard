import {
  faHouse,
  faUser,
  faCartShopping,
  faClipboard,
  faNoteSticky,
  faTableList,
  faCalendarDays,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItems from "./MenuItems";

const mainItems = [
  { name: "Homepage", icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: "Profile", icon: <FontAwesomeIcon icon={faUser} /> },
];

const listsItems = [
  { name: "Users", icon: <FontAwesomeIcon icon={faUser} /> },
  { name: "Products", icon: <FontAwesomeIcon icon={faCartShopping} /> },
  { name: "Orders", icon: <FontAwesomeIcon icon={faClipboard} /> },
];

const gerenalItems = [
  { name: "Notes", icon: <FontAwesomeIcon icon={faNoteSticky} /> },
  { name: "Forms", icon: <FontAwesomeIcon icon={faTableList} /> },
  { name: "Calendar", icon: <FontAwesomeIcon icon={faCalendarDays} /> },
];

const analyticsItems = [{ name: "Charts", icon: <FontAwesomeIcon icon={faChartSimple} /> }];

const Menu = () => {
  return (
    <>
      <MenuItems title="MAIN" menuItems={mainItems} />
      <MenuItems title="LISTS" menuItems={listsItems} />
      <MenuItems title="GENERAL" menuItems={gerenalItems} />
      <MenuItems title="ANALYTICS" menuItems={analyticsItems} />
    </>
  );
};

export default Menu;
