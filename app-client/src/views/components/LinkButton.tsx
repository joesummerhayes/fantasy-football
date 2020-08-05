import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  text: string;
  to: string;
  className?: string;
  smallButtonSecondary?: boolean;
  bigButtonDark?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'capitalize',
    letterSpacing: '1.2px',
    boxShadow: 'none',
    fontWeight: 400,
    borderRadius: 'inherit',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  smallButtonSecondary: {
    backgroundColor: theme.palette.secondary.dark,
    margin: '5px',
    minWidth: '6rem',
    height: '3rem',
    fontSize: '0.9rem',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  bigButtonPrimary: {
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.light,
    fontSize: '1.1rem',
    minWidth: '10rem',
    height: '3.5rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  bigButtonDark: {
    backgroundColor: 'black',
    color: 'white',
    minWidth: '10rem',
    fontSize: '1.1rem',
    height: '3.5rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: 'black',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  const classes = useStyles();
  const { text, className = '', smallButtonSecondary, bigButtonDark, to } = props;

  const getClass = () => {
    if (smallButtonSecondary) {
      return `${classes.root} ${classes.smallButtonSecondary} ${className}`;
    }
    if (bigButtonDark) {
      return `${classes.root} ${classes.bigButtonDark} ${className}`;
    }
    return `${classes.root} ${classes.bigButtonPrimary} ${className}`;
  };

  return (
    <Link to={to} className={classes.link}>
      <MuiButton
        className={getClass()}
        variant="contained"
        type="submit"
      >
        {text}
      </MuiButton>
    </Link>
  );
};

export default LinkButton;
