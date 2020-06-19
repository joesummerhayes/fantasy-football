import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import history from '../history';
import { logoutAction } from '../actions/index';

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

const Nav: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuth = useSelector((state: any) => state.user.loggedIn);

  const signout = (): void => {
    dispatch(logoutAction());
    // history.push('/login');
  };

  return (
    <div className={classes.navContainer}>
      <div className={classes.navLeft}>
        <Link to="/add-player">Add Player</Link>
      </div>
      <div className={classes.navRight}>
        {!isAuth && <Link to="/login">Login</Link>}
        {isAuth && <Link onClick={signout} to="/login">Sign Out</Link>}
      </div>
    </div>
  );
};

export default Nav;
