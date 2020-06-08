import React, {ReactElement} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  navContainer: {
    backgroundColor: '#358600',
    overflow: 'hidden',
    fontSize: '17px',
    padding: '14px 16px',
    '& a': {
      textDecoration: 'none',
      color: '#f2f2f2',
      textAlign: 'center',
      padding: '1rem',
    },
  },
  navLeft: {
    float: 'left',
  },
  navRight: {
    float: 'right',
  },
});

const Nav = (): ReactElement => {
  const classes = useStyles();

  const signout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  return (
    <div className={classes.navContainer}>
      <div className={classes.navLeft}>
        <Link to="/protectedRoute">tab 1</Link>
      </div>
      <div className={classes.navRight}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link onClick={signout} to="/login">Sign Out</Link>
      </div>
    </div>
  );
};

export default Nav;
