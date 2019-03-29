import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import {SearchBar} from './SearchBar'
import {UserNameRole} from './UserNameRole'
import {MenuList} from './MenuList'

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: '#179fec',
    height: 100 
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none'
  },
  toolbar: {
    ...theme.mixins.toolbar,
    height: 100,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
});

function PermanentDrawerLeft(props) {
  const { classes, communities, children } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color='primary'>
        <Toolbar>
          <SearchBar communities={communities} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} style={{ backgroundColor: '#525A62'}}>
          <img src='img/logo-new.png' width='250px'></img>
          <UserNameRole />
        </div>
        <Divider />
        <MenuList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const NavBar = withStyles(styles)(PermanentDrawerLeft);
