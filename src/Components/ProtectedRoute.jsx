import { useEffect } from "react";
import { useFakeUserContext } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useFakeUserContext();
  const nvigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) nvigate("/");
    },
    [isAuthenticated, nvigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
