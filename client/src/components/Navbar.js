import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logoutButton: {
    color: '#fff',
    backgroundColor: '#ff1744',
    '&:hover': {
      backgroundColor: '#d50000',
    },
  },
}));

const Navbar = ({ isLoggedIn }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>Quiz App</Link>
          </Typography>
          {isMobile ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <nav>
              <Button component={Link} to="/" color="inherit">Home</Button>
              {isLoggedIn ? (
                <>
                  <Button component={Link} to="/quiz" color="inherit">Quiz</Button>
                  <Button component={Link} to="/results" color="inherit">Results</Button>
                  <Button component={Link} to="/analytics" color="inherit">Analytics</Button>
                  <Button component={Link} to="/feedback" color="inherit">Feedback</Button>
                  <Button onClick={() => {
                    window.localStorage.clear()
                    window.location.reload()
                  }} color="inherit" className={classes.logoutButton}>Logout</Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/register" color="inherit">Register</Button>
                  <Button component={Link} to="/login" color="inherit">Login</Button>
                </>
              )}
            </nav>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          {isLoggedIn ? (
            <>
              <ListItem button component={Link} to="/quiz" onClick={handleDrawerClose}>
                <ListItemText primary="Quiz" />
              </ListItem>
              <ListItem button component={Link} to="/results" onClick={handleDrawerClose}>
                <ListItemText primary="Results" />
              </ListItem>
              <ListItem button component={Link} to="/analytics" onClick={handleDrawerClose}>
                <ListItemText primary="Analytics" />
              </ListItem>
              <ListItem button component={Link} to="/feedback" onClick={handleDrawerClose}>
                <ListItemText primary="Feedback" />
              </ListItem>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/register" onClick={handleDrawerClose}>
                <ListItemText primary="Register" />
              </ListItem>
              <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;