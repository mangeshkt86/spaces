import React, { useState, Fragment, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { API } from "../vars";
import { AllocationContext } from "../contexts/allocationContext";
import { Stack } from "@mui/material";
import FloorSelector from "../components/floorSelector";
import LocationAllocationContextProvider, {
  LocationAllocationContext,
} from "../contexts/locationAllocationContext";
import AllocationContextProvider from "../contexts/allocationContext";
import FloorAllocationContextProvider from "../contexts/floorAllocationContext";
import ZoneAllocationContextProvider from "../contexts/zoneAllocationContext";
import DeskAllocationContextProvider from "../contexts/deskAllocationContext";

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: "200px",
    textAlign: "left",
  },
}));

export default function Allocation() {
  return (
    <AllocationContextProvider>
      <LocationAllocationContextProvider>
        <FloorAllocationContextProvider>
          <ZoneAllocationContextProvider>
            <DeskAllocationContextProvider>
              <LocationSelector />
            </DeskAllocationContextProvider>
          </ZoneAllocationContextProvider>
        </FloorAllocationContextProvider>
      </LocationAllocationContextProvider>
    </AllocationContextProvider>
  );
}

export function LocationSelector() {
  const classes = useStyles();
  const location = useContext(LocationAllocationContext);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Stack spacing={3}>
            <FormControl>
              <Typography id="location-select">Location</Typography>
              <Select
                className={classes.select}
                labelId="location-select"
                id="location"
                defaultValue={location.location}
                size="small"
                onChange={(e) => location.allocate(e.target.value)}
              >
                <MenuItem key={0} value={0}>
                  --Select--
                </MenuItem>
                {location.locations?.map((loc) => (
                  <MenuItem key={loc.Id} value={loc}>
                    {loc.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <FloorSelector
                location={location.location}
                allocated={true}
              />
            </Box>
            <FloorSelector />
          </Stack>
        </Grid>
      </Box>
    </Container>
  );
}
