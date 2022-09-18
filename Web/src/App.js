import React, { useContext } from "react";
import Home from "./home";
import Login from "./login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import UserContext from "./contexts/userContext";

export function RequireAuth({ children }) {
  const user = useContext(UserContext);
  // if (!user?.user) {
  //   return <Navigate to="/login" />;
  // }

  return children;
}
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route exact path="/" element={<Login />} />
    </Routes>
  );
}
