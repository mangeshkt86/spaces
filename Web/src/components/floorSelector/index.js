import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Typography,
} from "@mui/material";
import { EventSeat, EventSeatOutlined } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { AllocationContext } from "../../contexts/allocationContext";
import { UserContext } from "../../contexts/userContext";
import { FloorAllocationContext } from "../../contexts/floorAllocationContext";
import { ZoneAllocationContext } from "../../contexts/zoneAllocationContext";
import { DeskAllocationContext } from "../../contexts/deskAllocationContext";

export default function FloorSelector({ floor, location, allocated }) {
  const user = useContext(UserContext);
  const [selected, setSelected] = useState(allocated);
  const floors = useContext(FloorAllocationContext);
  return floors.floors.map((f) => (
    <Card>
      <CardHeader><Typography>{f.Name}</Typography></CardHeader>
      <CardActionArea>
        <Checkbox
          checked={selected}
          onChange={(e) => floors.allocate(f)}
        ></Checkbox>
      </CardActionArea>
      <CardContent>
        <ZoneSelector />
      </CardContent>
    </Card>
  ));
}

function ZoneSelector({ allocated }) {
  const user = useContext(UserContext);
  const [selected, setSelected] = useState(allocated);
  const zones = useContext(ZoneAllocationContext);

  const allocate = (z) => {
    if (!selected) {
      zones.allocate(z);
    } else {
      zones.deallocate(z);
    }
    setSelected(!selected);
  };

  return zones.zones.map((z) => (
    <Card>
      <CardHeader>{z.Name}</CardHeader>
      <CardActionArea>
        <Checkbox
          checked={selected}
          onChange={(e) => zones.allocate(z)}
        ></Checkbox>
      </CardActionArea>
      <CardContent>
        {/* {floor.Desks.map((x, i) => (
          <DeskSelector desk={x} zone={zone} floor={floor} />
        ))} */}
      </CardContent>
    </Card>
  ));
}

function DeskSelector({ desk, allocated, zone, floor }) {
  const user = useContext(UserContext);
  const desks = useContext(DeskAllocationContext);
  const [selected, setSelected] = useState(allocated);

  const allocate = (d) => {
    desks.allocate(desk);

    setSelected(true);
  };

  const deallocate = (d) => {
    allocation.deallocateDesk(desk);
    setSelected(false);
  };

  return desks.desks.map((d) => {
    return selected ? (
      <Chip
        label={desk.DeskNumber}
        variant={"filled"}
        color="primary"
        icon={<EventSeat />}
        onClick={(e) => allocate(d)}
      />
    ) : (
      <Chip
        label={desk.DeskNumber}
        onClick={deallocate}
        variant={"outlined"}
        color="secondary"
        icon={<EventSeatOutlined />}
        onClick={(e) => deallocate(d)}
      />
    );
  });
}
