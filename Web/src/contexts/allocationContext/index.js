import React, { useEffect, useState,useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getRoles, getUser } from "../../apis/userApi";

const AllocationContext = React.createContext({});

export default function AllocationContextProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const user = useContext(UserContext);;
  const [allocation, setAllocation] = useState([]);
  const [location, setLocation] = useState();
  const [oeCode, setOeCode] = useState();
  
  useEffect(() => {
    getLocations().then(x=> {
        setLocations(x)
    });
  }, []);

  function changeLocation(rolel) {
    setRole(l);
  }

  return (
    <AllocationContext.Provider
      value={{
        location,
        locations,
        allocation,
        oeCode
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
}

export { AllocationContext };
