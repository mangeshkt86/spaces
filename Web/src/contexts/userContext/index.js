import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getRoles, getUser } from "../../apis/userApi";

const UserContext = React.createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(1);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  function changeRole(role) {
    setRole(role);
  }

  function login(userId) {
    return getUser(userId).then((x) => {
      setUser(x);
    });
  }
  return (
    <UserContext.Provider
      value={{
        ...user,
        ...role,
        roles,
        login,
        changeRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
