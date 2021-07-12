import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  snackbar: {
      flexDirection: "column",
      textAlign: "left"
  },
  alert: {
      marginTop: "10px",
      width: "300px",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
}));

export default function CustomizedSnackbars({ notifications, show }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar className={classes.snackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={show}>
            <>
                {[...notifications].reverse().map((noti, index) => (
                    <Alert key={noti+index} className={classes.alert} severity={noti.type}>
                        {noti.message}
                    </Alert>
                ))}
            </>
      </Snackbar>
    </div>
  );
}
