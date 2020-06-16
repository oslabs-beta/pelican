/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import BlurCircularSharpIcon from '@material-ui/icons/BlurCircularSharp';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import * as actions from '../actions/actions';
import NamespaceDropdown from './NamespaceDropdown.jsx';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',

      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function icons(index) {
    if (index === 0) return <RadioButtonCheckedIcon color="primary" />;
    if (index === 1) return <BlurCircularSharpIcon color="primary" />;
    if (index === 2) return <PieChartRoundedIcon color="primary" />;
    if (index === 3) return <AccountTreeIcon color="primary" />;
    if (index === 4) return <PeopleAltRoundedIcon color="primary" />;
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{}} />
      <Divider />
      <List>
        {['Pods', 'Nodes', 'Deployments', 'Services'].map((text, index) => (
          <Link
            style={{ textDecoration: 'none', color: '#00a0a0' }}
            to={`/${text.toLowerCase()}`}
            key={text}
          >
            <ListItem>
              <ListItemIcon>{icons(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <NamespaceDropdown />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="selectable tables">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default SideBar;

export function TopBar() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Pelican
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
