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

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: "200px",
    textAlign: "left",
  },
}));

export default function Allocation() {
  const classes = useStyles();
  const allocation = useContext(AllocationContext);

  return (
    <Fragment>
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
                  value={allocation.location.id}
                  size="small"
                  onChange={(e) => allocation.changeLocation(e.target.value)}
                >
                  <MenuItem key={0} value={0}>
                    --Select--
                  </MenuItem>
                  {allocation.locations.map((loc) => (
                    <MenuItem key={loc.Id} value={loc.Id}>
                      {loc.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <Typography id="floor-select">Floor</Typography>
                <Select
                  className={classes.select}
                  labelId="floor-select"
                  id="floor"
                  value={allocation.floor.id}
                  size="small"
                  onChange={(e) => allocation.changeFloor(e.target.value)}
                >
                  <MenuItem key={0} value={0}>
                    --Select--
                  </MenuItem>
                  {allocation.floors.map((f) => (
                    <MenuItem key={f.Id} value={f.Id}>
                      {f.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}
