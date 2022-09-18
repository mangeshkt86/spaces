import React, { useState, Fragment, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {API} from '../vars';
import { AllocationContext } from '../contexts/allocationContext';

const useStyles = makeStyles((theme) => ({
    select:{
        minWidth: "200px",
        textAlign: 'left',
    }
}));

export default function Allocation() {
    const classes = useStyles();
    const allocation = useContext(AllocationContext);

    return (
        <Fragment>
            <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        <FormControl size="small">
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    Office / Location :
                                </Grid>
                                <Grid item>
                                        <Select
                                            className={classes.select}
                                            labelId="location-select"
                                            id="location"
                                            value={allocation.location}
                                            size="small"
                                            onChange={(e) => allocation.changeLocation(e.target.value)}
                                        >
                                            <MenuItem key={0} value={0}>--Select--</MenuItem>
                                            {
                                                allocation.locations.map(loc => ( <MenuItem key={loc.Id} value={loc.Id}>{loc.Name}</MenuItem> ))
                                            }
                                        </Select>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    Floor :
                                </Grid>
                                <Grid item>
                                        <Select
                                            className={classes.select}
                                            labelId="floor-select"
                                            id="floor"
                                            value={allocation.floor}
                                            size="small"
                                            onChange={(e) => allocation.changeFloor(e.target.value)}
                                        >
                                            <MenuItem key={0} value={0}>--Select--</MenuItem>
                                            {
                                                allocation.floors.map(floor => ( <MenuItem key={floor.Id} value={floor.Id}>{floor.Name}</MenuItem> ))
                                            }
                                        </Select>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    )
}