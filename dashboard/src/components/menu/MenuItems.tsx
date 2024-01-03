import { Link } from "react-router-dom";

type MenuItemsProps = {
  title: string;
  menuItems: {
    name: string;
    icon: JSX.Element;
  }[];
};

const MenuItems = ({ title, menuItems }: MenuItemsProps) => {
  return (
    <div className="items">
      <span className="items__title">{title}</span>
      <div className="items__container">
        {menuItems.map((item, index) => (
          <Link to={item.name.toLocaleLowerCase()}>
            <div key={index} className="items__container-icon">
              {item.icon}
              <p className="">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
