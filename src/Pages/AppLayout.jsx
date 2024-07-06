import styles from "./AppLayout.module.css";
import Sidebar from "./../Components/Sidebar";
import Map from "../Components/Map";
import User from "../Components/User";
import { useFakeUserContext } from "../Contexts/FakeAuthContext";
import Button from "./../Components/Button";
import { useState } from "react";

function AppLayout() {
  const { isAuthenticated } = useFakeUserContext();
  const [isSideBarOpen, setIsSidBarOpen] = useState(false);

  function handleSideBar() {
    setIsSidBarOpen((cur) => !cur);
  }
  return (
    <div className={styles.app}>
      <Button onClick={handleSideBar} className={styles.Btn} type={"primary"}>
        {isSideBarOpen ? "x" : "↓"}
      </Button>
      <Sidebar isSideBarOpen={isSideBarOpen} />
      {isAuthenticated ? <User /> : null}
      <Map setIsSidBarOpen={setIsSidBarOpen} />
    </div>
  );
}

export default AppLayout;
