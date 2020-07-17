import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../actions/index';

const useStyles = makeStyles((theme) => ({
  outline: {
    backgroundColor: theme.palette.secondary.light,
    color: 'black',
    minWidth: '7rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.9rem',
  },
  copy: {
    padding: '0.9rem 1rem 0.9rem 1rem',
    textTransform: 'capitalize',
    letterSpacing: theme.spacing(1),
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: 'black',
    minWidth: '7rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.9rem',
  },
}));

interface Props {
  to: string;
  copy: string;
  className: string;
  active?: boolean;
  signOut?: boolean;
}

const NavItem: React.FC<Props> = (props: Props): ReactElement => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const {
    to,
    copy,
    className = '',
    active = false,
    signOut,
  } = props;

  const handleOnClick = (): void => {
    if (signOut) {
      dispatch(logoutAction());
    }
  };

  return (
    <Link to={to} className={className} onClick={handleOnClick}>
      <div className={`${active ? classes.active : classes.outline}`}>
        <div className={classes.copy}>
          {copy}
        </div>
      </div>
    </Link>
  );
};

export default NavItem;
