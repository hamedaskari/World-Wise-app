import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
function Sidebar({ isSideBarOpen }) {
  polyfillCountryFlagEmojis();
  return (
    <div
      className={`${styles.sidebar} ${
        isSideBarOpen ? styles.SideBarOpen : styles.SideBarClose
      }`}
    >
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
