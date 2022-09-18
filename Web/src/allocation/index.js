import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {API} from '../vars';

const useStyles = makeStyles((theme) => ({
    select:{
        minWidth: "200px",
        textAlign: 'left',
    }
}));

export default function Allocation() {
    const classes = useStyles();

    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState();

    const getApiData = async () => {
        // fetch(API.LOCATIONS)
        // .then(response => console.log(response))
        // .then(json => console.log(json))

        let response = [{"id":1,"name":"EON 1","status":"Y","tblFloors":[]},{"id":2,"name":"EON 2","status":"Y","tblFloors":[]}]
        setLocations(response);
        console.log(locations);
    };

   // getApiData();
//    Lead =
// 	Office / Location -EON -- 
// 	Floor
// 	Zone
// 	DESK

    useEffect(()=>{
        getApiData();
    },[])

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
                                            value={location}
                                            size="small"
                                            onChange={(e) => setLocation(e.target.value)}
                                        >
                                            {
                                                locations.map(loc => ( <MenuItem key={loc.id} value={loc.id}>{loc.name}</MenuItem> ))
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