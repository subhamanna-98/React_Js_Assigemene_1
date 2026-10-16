import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="flex flex-row g-2">
        <NavLink to="/">
          {({ isActive }) => (
            <span
              className={isActive ? "font-bold text-red-600" : "text-green-500"}
            >
              Home
            </span>
          )}
        </NavLink>
        <NavLink to="/about">
          {({ isActive }) => (
            <span
              className={isActive ? "font-bold text-red-600" : "text-green-500"}
            >
              About us
            </span>
          )}
        </NavLink>
        <NavLink to="/contact">
          {({ isActive }) => (
            <span
              className={isActive ? "font-bold text-red-600" : "text-green-500"}
            >
              Contact
            </span>
          )}
        </NavLink>
        <NavLink to="/product">
          {({ isActive }) => (
            <span
              className={isActive ? "font-bold text-red-600" : "text-green-500"}
            >
              Product
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
export default Header;
