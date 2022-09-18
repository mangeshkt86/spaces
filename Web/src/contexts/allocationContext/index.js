import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { getLocations } from "../../apis/locationApi";
import { getFloor, getFloors, getZones } from "../../apis/floorApi";
import { getRoles, getUser } from "../../apis/userApi";
import { useSnackbar } from "notistack";
import draftAllocation from "../../config/allocation.json";

const AllocationContext = React.createContext({});

export default function AllocationContextProvider({ children }) {
  const [allocations, setAllocations] = useState([]);

  const [allocationData, setAllocationData] = useState({
    oeCode: "",
    startDate: new Date(),
    endDate: new Date(),
    allocationDate: new Date(),
    allocationId: 0,
  });

  useEffect(() => {
    console.log(allocations);
  }, [allocations])
  
  const changeOeCode = (code) => {
    setAllocationData({ ...allocationData, oeCode: code });
  };

  const changeStartDate = (dt) => {
    setAllocationData({ ...allocationData, startDate: dt });
  };

  const changeEndDate = (dt) => {
    setAllocationData({ ...allocationData, endDate: dt });
  };

  const add = (desk) => {
    setAllocations([...allocations.concat(desk)]);
  };

  const remove = (desks) => {
    var existingAllocations = [...allocations].filter(x => !desks.find(d=> d.Id==x.Id));
    setAllocations([...existingAllocations]);
  };

  return (
    <AllocationContext.Provider
      value={{
        allocations,
        add,
        remove
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
}

export { AllocationContext };
