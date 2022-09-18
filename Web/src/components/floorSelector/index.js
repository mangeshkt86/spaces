import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
  Checkbox,
  Chip,
  Typography,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import {
  EventSeat,
  EventSeatOutlined,
  Signpost,
  SignpostOutlined,
} from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { AllocationContext } from "../../contexts/allocationContext";
import { UserContext } from "../../contexts/userContext";
import { FloorAllocationContext } from "../../contexts/floorAllocationContext";
import { ZoneAllocationContext } from "../../contexts/zoneAllocationContext";
import { DeskAllocationContext } from "../../contexts/deskAllocationContext";
import { LocationAllocationContext } from "../../contexts/locationAllocationContext";
import { getFloor } from "../../apis/floorApi";
import _ from "lodash";

export default function FloorSelector() {
  const user = useContext(UserContext);
  const floorContext = useContext(FloorAllocationContext);
  const location = useContext(LocationAllocationContext);
  return (
    <Grid container sx={{ flexWrap: "wrap", m: 1 }}>
      {floorContext.floors.map((f, i) => (
        <Floor floor={f} key={i} location={location.location} />
      ))}
    </Grid>
  );
}
export function Floor({ floor, location }) {
  return (
    <Grid item sx={{ flexWrap: "wrap" }}>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {floor.Name}
          </Typography>
          <ZoneSelector floor={floor} />
        </CardContent>
      </Card>
    </Grid>
  );
}

function ZoneSelector({ allocated, floor }) {
  const user = useContext(UserContext);
  const zones = useContext(ZoneAllocationContext);

  return _.sortBy(
    zones.zones.filter((x) => x.FloorId == floor.Id),
    (x) => {
      x.Floor.Name, x.Name;
    }
  ).map((z, i) => <Zone zone={z} key={i} id={i} />);
}

function Zone({ zone, onSelect, onDeselect, id }) {
  const allocations = useContext(AllocationContext);
  const zones = useContext(ZoneAllocationContext);
  const [selected, setSelected] = useState( false || 
    allocations.allocations.findIndex((x) => x.ZoneId == zone.Id)
  );

  useEffect(() => {
    setSelected(allocations.allocations.some((x) => x.ZoneId == zone.Id));
  }, [allocations.allocations]);

  return (
    <Grid item sx={{ display: "flex", flexWrap: "wrap" }}>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <CardContent>
          <Stack direction="column">
            {selected ? (
              <Chip
                sx={{ m: 1, fontSize: "1.2rem", width: "fit-content" }}
                label={`${zone.Floor.Name}-${zone.Name} (${zone.TblDesks.length})`}
                variant={"filled"}
                color="success"
                icon={<Signpost />}
                onClick={(e) => {
                  zones.deallocate(zone);
                }}
              />
            ) : (
              <Chip
                sx={{ m: 1, fontSize: "1.2rem", width: "fit-content" }}
                label={`${zone.Floor.Name}-${zone.Name}`}
                variant={"outlined"}
                color="default"
                icon={<SignpostOutlined />}
                onClick={(e) => {
                  zones.allocate(zone);
                }}
              />
            )}
          </Stack>
          <DeskSelector zone={zone} key={id} />
        </CardContent>
      </Card>
    </Grid>
  );
}

function DeskSelector({ zone }) {
  const user = useContext(UserContext);
  const desks = useContext(DeskAllocationContext);

  return desks.desks
    .filter((x) => x.ZoneId == zone.Id)
    .map((d, i) => {
      return <Desk desk={d} zone={zone} key={i}/>;
    });
}

function Desk({ desk, zone, floor, location }) {
  const allocations = useContext(AllocationContext);
  const desks = useContext(DeskAllocationContext);

  const [selected, setSelected] = useState(
    allocations.allocations.some((x) => x.DeskNumber == desk.DeskNumber)
  );

  useEffect(() => {
    setSelected(allocations.allocations.some((x) => x.DeskNumber == desk.DeskNumber));
  }, [allocations.allocations]);

  const allocate = (d) => {
    desks.allocate([].concat(d));
  };

  const deallocate = (d) => {
    desks.deallocate([].concat(d));
  };
  return selected ? (
    <Chip
      sx={{ m: 1 }}
      label={desk.DeskNumber}
      variant={"filled"}
      color="success"
      icon={<EventSeat />}
      onClick={(e) => deallocate(desk)}
    />
  ) : (
    <Chip
      sx={{ m: 1 }}
      label={desk.DeskNumber}
      variant={"outlined"}
      color="secondary"
      icon={<EventSeatOutlined />}
      onClick={(e) => allocate(desk)}
    />
  );
}
