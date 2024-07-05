import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "./../Components/PageNav";
import { useFakeUserContext } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function Login() {
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("Ali@example.com");
  const [password, setPassword] = useState("Ali1382");
  const { login, isAuthenticated } = useFakeUserContext();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              if ((email, password)) login(email, password);
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
