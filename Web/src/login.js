import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";
import { UserContext } from "./contexts/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //backgroundColor: "#215f67",
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  loginContainer: {
    padding: theme.spacing(5),
  },
  select: {
    minWidth: "200px",
    textAlign: "left",
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [userid, setUserid] = useState("");
  const user = React.useContext(UserContext);

  useEffect(() => {}, []);

  const validateForm = () => {
    return userid.length > 0;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    user.login(userid).then((a) => {
      navigate("/home");
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Spaces - Allocate your space
        </Typography>
        {/* <div className={classes.root}> */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
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
                    <PeopleIcon color="primary" />
                  </Grid>
                  <Grid item>
                    <Select
                      className={classes.select}
                      labelId="roles-select-label"
                      id="userrole"
                      value={user.role}
                      size="small"
                      onChange={(e) => user.changeRole(e.target.value)}
                    >
                      {user.roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                    .
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AssignmentIndIcon color="primary" />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="userid"
                      id="input-with-icon-grid"
                      label="UserId"
                      value={userid}
                      onChange={(e) => setUserid(e.target.value)}
                      autoComplete="off"
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={!validateForm()}
                      onClick={(e) => handleLogin(e)}
                    >
                      GO
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        {/* </div> */}
      </Box>
    </Container>
  );
}
