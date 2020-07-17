import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountIcon from '@material-ui/icons/Person';
import navImage from '../../images/topnav.png';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundImage: `url(${navImage})`,
    backgroundSize: '100%',
    backgroundRepeat: 'round',
    height: '90px',
  },
  myAccount: {
    float: 'right',
    padding: '10px',
    fontWeight: 'lighter',
    letterSpacing: theme.spacing(1),
  },
}));

const Header: React.FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className={classes.myAccount}>
        My Account
        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
