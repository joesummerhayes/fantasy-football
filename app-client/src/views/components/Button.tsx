import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

interface ButtonProps {
  text: string;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
}));

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const classes = useStyles();
  const { text, clickHandler, className = '', smallButtonSecondary, bigButtonDark } = props;

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
    <MuiButton
      onClick={clickHandler}
      className={getClass()}
      variant="contained"
      type="submit"
    >
      {text}
    </MuiButton>
  );
};

export default Button;
