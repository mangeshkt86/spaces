import {React, useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minWidth: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      //backgroundColor: "#215f67",
      overflow: "hidden"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    loginContainer:{
      padding: theme.spacing(5),
    },
    select:{
        minWidth: "200px",
        textAlign: 'left',
    }
}));

export default function Login() {
    const classes = useStyles();
    
    const [userrole, setUserrole] = useState(1);
    const [userroles, setUserroles] = useState([]);
    const [userid, setUserid] = useState("");

    useEffect(()=>{
        getUserRoles();
    },[])

    const getUserRoles = ( ) =>{

        const userRoles = [
            { name: "Admin", id: 1 },
            { name: "Department Lead", id: 2 },
            { name: "Manager", id: 3 },
            { name: "Employee", id: 4 },
        ];

        setUserroles(userRoles);
    }

    const validateForm = () => {
        return userid.length > 0 ;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        // <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={10} sm={8} md={8} lg={10}>
                    <Paper className={classes.paper} elevation={8}>
                        <FormControl size="small">
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    {/* <img src={logo} alt="logo" style={{ width: '30%' }} /> */}
                                </Grid>
                            </Grid>
                    
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <PeopleIcon color="primary"/>
                                </Grid>
                                <Grid item>
                                    <Select
                                        className={classes.select}
                                        labelId="roles-select-label"
                                        id="userrole"
                                        value={userrole}
                                        size="small"
                                        onChange={(e) => setUserrole(e.target.value)}
                                    >
                                        {
                                            userroles.map(role => ( <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem> ))
                                        }
                                    </Select>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AssignmentIndIcon color="primary"/>
                                </Grid>
                                <Grid item>
                                    <TextField type="userid"
                                        id="input-with-icon-grid"
                                        label="UserId"
                                        value={userid}
                                        onChange={(e) => setUserid(e.target.value)}
                                        autoComplete='off'
                                        color="primary"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                                <Grid item>
                                    <Button size="large" type="submit" variant="contained" color="secondary"
                                        disabled={!validateForm()}
                                        onClick={(e) => handleSubmit(e)}>
                                        GO
                                    </Button>
                                </Grid>
                            </Grid>
                    </FormControl >
                </Paper>
                </Grid>
            </Grid>
        // </div>
    );
}