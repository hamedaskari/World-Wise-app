import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useFakeUserContext } from "../Contexts/FakeAuthContext";
function PageNav() {
  const { isAuthenticated, logout } = useFakeUserContext();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => {
              if (isAuthenticated) logout();
            }}
            to="/login"
            className={styles.ctaLink}
          >
            {isAuthenticated ? "logout" : "login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
