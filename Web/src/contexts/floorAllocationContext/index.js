import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getFloor, getFloors, getZones } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";
import { useSnackbar } from "notistack";
import draftAllocation from '../../config/allocation.json';
import { LocationAllocationContext } from "../locationAllocationContext";

const FloorAllocationContext = React.createContext({});

export default function FloorAllocationContextProvider({ children }) {
  const [floors, setFloors] = useState([]);
  const location = useContext(LocationAllocationContext);

  useEffect(() => {
    if(!location.location)
      return;
    getFloors(location.location).then(setFloors);
  }, [location.location]);

  const allocate = (floor)=>{
    var z = getZones(floor.Id);
    var desks = getDesks(z.map(x=>x.Id));
    allocations.add(desks)
  }

  const deallocate = (zone)=>{
    var z = getZones(floor.Id);
    var desks = getDesks(z.map(x=>x.Id));
    allocations.remove(desks);
  }
  
  return (
    <FloorAllocationContext.Provider
      value={{
        floors,
        allocate,
        deallocate
      }}
    >
      {children}
    </FloorAllocationContext.Provider>
  );
}

export { FloorAllocationContext };
