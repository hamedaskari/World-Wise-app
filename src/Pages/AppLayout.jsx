import styles from "./AppLayout.module.css";
import Sidebar from "./../Components/Sidebar";
import Map from "../Components/Map";
import User from "../Components/User";
import { useFakeUserContext } from "../Contexts/FakeAuthContext";

function AppLayout() {
  const { isAuthenticated } = useFakeUserContext();

  return (
    <div className={styles.app}>
      <Sidebar />
      {isAuthenticated ? <User /> : null}
      <Map />
    </div>
  );
}

export default AppLayout;
