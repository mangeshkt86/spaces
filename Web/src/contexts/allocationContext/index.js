import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getFloors, getZones } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";
import { useSnackbar } from "notistack";

const AllocationContext = React.createContext({});

export default function AllocationContextProvider({ children }) {
  // const { enqueueSnackbar } = useSnackbar();
  const [locations, setLocations] = useState([]);
  const [floors, setFloors] = useState([]);
  const user = useContext(UserContext);
  const [allocation, setAllocation] = useState([]);
  const [location, setLocation] = useState(0);
  const [floor, setFloor] = useState(0);
  const [oeCode, setOeCode] = useState();

  useEffect(() => {
    getLocations().then((x) => {
      setLocations(x);
    });
  }, []);

  const changeLocation = (id) => {
    var selected = { ...locations.find((x) => x.Id == id) };
    setLocation(selected);
    // enqueueSnackbar(`Location changed to ${selected.Name} `, "info");
    getFloors(selected).then((x) => {
      setFloors(x);
    });
  };

  const changeFloor = (floorId) => {
    var selected = floors.filter((x) => x.Id == floorId);
    setFloor(selected);

    getZones().then((x) => {
      setZones(x);
    });
  };

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
