import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../img/mysearch.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    color: 'white',
    padding: '0 30px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="static">
        <Toolbar>
            <img src={logo} alt="" />
          <Typography variant="h6" className={classes.title}>
            {/* <Box fontWeight="fontWeightBold">MYSEARCH</Box> */}
          </Typography>
          {/* <Button edge="end" color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
