import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getDesks, getFloor, getFloors, getZones } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";
import { useSnackbar } from "notistack";
import draftAllocation from '../../config/allocation.json';
import { ZoneAllocationContext } from "../zoneAllocationContext";
import { FloorAllocationContext } from "../floorAllocationContext";
import { LocationAllocationContext } from "../locationAllocationContext";

const DeskAllocationContext = React.createContext({});

export default function DeskAllocationContextProvider({ children }) {
  const [desks, setDesks] = useState([]);
  const zone = useContext(ZoneAllocationContext);

  useEffect(() => {
    getDesks(zone.zones).then(setDesks);
  }, [location]);

  const allocate = (desk)=>{
    allocations.add(desk);
  }

  const deallocate = (desk)=>{
    allocations.remove(desk);
  }

  return (
    <DeskAllocationContext.Provider
      value={{
        desks,
        allocate,
        deallocate
      }}
    >
      {children}
    </DeskAllocationContext.Provider>
  );
}

export { DeskAllocationContext };
