import {
  faHouse,
  faUser,
  faCartShopping,
  faClipboard,
  faCalendarDays,
  faChartSimple,
  faChartLine,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItems from "./MenuItems";

const mainItems = [
  { name: "Home", icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: "Profile", icon: <FontAwesomeIcon icon={faUser} /> },
];

const listsItems = [
  { name: "Users", icon: <FontAwesomeIcon icon={faUser} /> },
  { name: "Products", icon: <FontAwesomeIcon icon={faCartShopping} /> },
  { name: "Orders", icon: <FontAwesomeIcon icon={faClipboard} /> },
];

const gerenalItems = [{ name: "Calendar", icon: <FontAwesomeIcon icon={faCalendarDays} /> }];

const analyticsItems = [
  { name: "BarChart", icon: <FontAwesomeIcon icon={faChartSimple} /> },
  { name: "LineChart", icon: <FontAwesomeIcon icon={faChartLine} /> },
  { name: "PieChart", icon: <FontAwesomeIcon icon={faChartPie} /> },
];

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
