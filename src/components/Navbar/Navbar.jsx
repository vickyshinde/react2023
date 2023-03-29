import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/user-listing">User Listing</NavLink>
          </li>
          <li>
            <NavLink to="/user-listing-adv">User Listing Adv</NavLink>
          </li>
          <li>
            <NavLink to="/user-listing-adv1">User Listing Adv1</NavLink>
          </li>
          <li>
            <NavLink to="/user-add">User add</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
  );
};

export default NavBar;
