import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getDesks, getFloor, getFloors, getZones } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";
import { useSnackbar } from "notistack";
import draftAllocation from "../../config/allocation.json";
import { AllocationContext } from "../allocationContext";

const LocationAllocationContext = React.createContext({});

export default function LocationAllocationContextProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();
  const allocations = useContext(AllocationContext);
  
  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  useEffect(() => {
    if (locations.length) setLocation(locations[0]);
  }, [locations]);

  const allocate = (l) => {
    var l = locations.find(x=>x.Id==l);
    setLocation(l);
    var f = getFloors(l).then((f) => {
      getZones(f).then((z) => {
        getDesks(z).then((d) => {
          allocations.add(d);
        });
      });
    });
  };

  const deallocate = (location) => {
    setLocation(null);
    var f = getFloors(location).then((f) => {
      getZones(f).then((z) => {
        getDesks(z).then((d) => {
          allocations.remove(d);
        });
      });
    });
  };

  return (
    <LocationAllocationContext.Provider
      value={{
        locations,
        location,
        allocate,
        deallocate,
      }}
    >
      {children}
    </LocationAllocationContext.Provider>
  );
}

export { LocationAllocationContext };
