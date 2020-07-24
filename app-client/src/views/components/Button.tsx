import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.light,
    fontSize: '1.1rem',
    letterSpacing: '1.2px',
    minWidth: '10rem',
    height: '3.5rem',
    boxShadow: 'none',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      boxShadow: 'none',
    },
  },
}));

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const classes = useStyles();
  const { text, onClick, className = '' } = props;
  return (
    <MuiButton
      onClick={onClick}
      className={`${classes.root} ${className}`}
      variant="contained"
      type="submit"
    >
      {text}
    </MuiButton>
  );
};

export default Button;
