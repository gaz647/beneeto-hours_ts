import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="nav-link" to={"/"}>
        Přidat
      </NavLink>
      <NavLink className="nav-link" to={"/summary"}>
        Souhrn
      </NavLink>
    </nav>
  );
};

export default Navbar;
