import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link active" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user-listing">
            User Listing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user-listing-adv">
            User Listing Adv
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user-listing-adv1">
            User Listing Adv1
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user-add">
            User add
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/form">
            Form
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user-add-mongo">
            User add Mongo
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
