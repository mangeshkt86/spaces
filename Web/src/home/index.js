import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { withStyles, makeStyles, createStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import CalendarViewMonthSharpIcon from '@mui/icons-material/CalendarViewMonthSharp';
import { useNavigate, Navigate  } from "react-router-dom";

import Booking from '../booking';
import Allocation from '../allocation';
import Configuration from '../configuration';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
  }),
);

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#CCC',
    color: '#000',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: '10px 5px',
  },
}))(Tooltip);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = useState('allocation');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (key) => {
    console.log(key);
    setSelectedMenu(key);
  }

  const handleLogoutClick = (key) => {
    
    sessionStorage.setItem("loggedInUser", "");
    navigate('../Login');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Spaces - Allocate your space
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <LightTooltip title="Configuration" placement="right" arrow>
            <ListItem button key={"Configuration"} onClick={(e) => handleMenuClick('configuration')}>
              <ListItemIcon><SettingsSharpIcon /></ListItemIcon>
              <ListItemText primary={"Configuration"} />
            </ListItem>
          </LightTooltip>
        </List>
        <List>
          <LightTooltip title="Seat Allocation" placement="right" arrow>
            <ListItem button key={"Allocation"} onClick={(e) => handleMenuClick('allocation')}>
              <ListItemIcon><DashboardSharpIcon /></ListItemIcon>
              <ListItemText primary={"Allocation"} />
            </ListItem>
          </LightTooltip>
        </List>
        <List>
          <LightTooltip title="Seat Booking" placement="right" arrow>
            <ListItem button key={"Booking"} onClick={(e) => handleMenuClick('booking')}>
              <ListItemIcon><CalendarViewMonthSharpIcon /></ListItemIcon>
              <ListItemText primary={"Booking"} />
            </ListItem>
          </LightTooltip>
        </List>
        <Divider />
        <List>
          <LightTooltip title="Logout" placement="right" arrow>
            <ListItem button key={"Logout"} onClick={(e) => handleLogoutClick('logout')}>
              <ListItemIcon><ExitToAppSharpIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </LightTooltip>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {
              {
                'configuration': <Configuration />,
                'booking': <Booking />,
                'allocation': <Allocation />
              }[selectedMenu]
            }
          </main>
      </Box>
    </Box>
  );
}
