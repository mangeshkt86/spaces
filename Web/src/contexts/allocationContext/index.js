import React, { useEffect, useState,useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getFloors } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";

const AllocationContext = React.createContext({});

export default function AllocationContextProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [floors, setFloors] = useState([]);
  const user = useContext(UserContext);
  const [allocation, setAllocation] = useState([]);
  const [location, setLocation] = useState(0);
  const [floor, setFloor] = useState(0);
  const [oeCode, setOeCode] = useState();
  
  useEffect(() => {
    getLocations().then(x=> {
        setLocations(x)
    });
  }, []);

  const changeLocation = (location) => {
    setLocation(location);

    getFloors().then(x=> {
      setFloors(x)
    });
  }

  const changeFloor = (floor) => {
    setFloor(floor);
    
    getZones().then(x=> {
      setZones(x)
    });
  }

  return (
    <AllocationContext.Provider
      value={{
        location,
        locations,
        allocation,
        oeCode,
        changeLocation,
        floors,
        floor,
        changeFloor,
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
}

export { AllocationContext };
