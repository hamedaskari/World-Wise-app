import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
const Fake_User = {
  name: "Ali",
  email: "Ali@example.com",
  password: "Ali1382",
  avatar: "https://randomuser.me/api/portraits/men/43.jpg",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Login failed");
  }
}

function FakeAuthContext({ children }) {
  //   const navigate = useNavigate();
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === Fake_User.email && password === Fake_User.password)
      dispatch({ type: "login", payload: Fake_User });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, Fake_User }}>
      {children}
    </AuthContext.Provider>
  );
}

function useFakeUserContext() {
  const contxet = useContext(AuthContext);
  if (contxet === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return contxet;
}

export { FakeAuthContext, useFakeUserContext };
