import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import history from '../history';
import { logoutAction } from '../actions/index';
import NavItem from './components/NavItem';


const useStyles = makeStyles({
  navContainer: {
    paddingLeft: '3rem',
    paddingRight: '3rem',
    fontSize: '17px',
    height: '60px',
    '& a': {
      textDecoration: 'none',
      textAlign: 'center',
    },
  },
  navLeft: {
    float: 'left',
    padding: '0 .5rem 0 .5rem',
  },
  navRight: {
    float: 'right',
    padding: '0 .5rem 0 .5rem',
  },
});

const Nav = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.user.loggedIn);
  const [activeTab, setActiveTab] = React.useState({
    myTeam: false,
    leagues: false,
    auctionRoom: false,
  });

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/my-team') {
      setActiveTab({
        myTeam: true,
        leagues: false,
        auctionRoom: false,
      });
    }
    else if (pathname === '/leagues') {
      setActiveTab({
        myTeam: false,
        leagues: true,
        auctionRoom: false,
      });
    }
    else if (pathname === '/auction-room') {
      setActiveTab({
        myTeam: false,
        leagues: false,
        auctionRoom: true,
      });
    } else if (pathname === '/login') {
      setActiveTab({
        myTeam: false,
        leagues: false,
        auctionRoom: false,
      });
    }
  }, [pathname]);

  // const signout = (): void => {
  //   dispatch(logoutAction());
  //   history.push('/login');
  // };

  return (
    <div className={classes.navContainer}>
      <div>
        <NavItem to="my-team" copy="My Team" className={classes.navLeft} active={activeTab.myTeam} />
        <NavItem to="leagues" copy="Leagues" className={classes.navLeft} active={activeTab.leagues} />
        <NavItem to="auction-room" copy="Auction Room" className={classes.navLeft} active={activeTab.auctionRoom} />
        <NavItem to="/login" copy="Sign Out" className={classes.navRight} signOut />
      </div>
      {/* <div className={classes.navRight}>
        {!isAuth && <Link to="/login">Login</Link>}
        {!isAuth && <Link to="/signup">Sign Up</Link>}
        {isAuth && <Link onClick={signout} to="/login">Sign Out</Link>}
      </div> */}
    </div>
  );
};

export default Nav;
