import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getFloor, getFloors, getZones } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";
import { useSnackbar } from "notistack";
import draftAllocation from '../../config/allocation.json';
import { FloorAllocationContext } from "../floorAllocationContext";

const ZoneAllocationContext = React.createContext({});

export default function ZoneAllocationContextProvider({ children }) {
  const [zones, setZones] = useState([]);
  const floor = useContext(FloorAllocationContext);

  useEffect(() => {
    if(!floor.floors)
      return;
    getZones(floor.floors).then(setZones);
  }, []);

  const allocate = (zone)=>{
    var z = getZone(zone.Id);
    allocations.add(z.TblDesks)
  }

  const deallocate = (zone)=>{
    var z = getZone(zone.Id);
    allocations.remove(z.TblDesks);
  }
  
  return (
    <ZoneAllocationContext.Provider
      value={{
        zones,
        allocate,
        deallocate
      }}
    >
      {children}
    </ZoneAllocationContext.Provider>
  );
}

export { ZoneAllocationContext };
