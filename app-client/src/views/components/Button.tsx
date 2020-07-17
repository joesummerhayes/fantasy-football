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
    letterSpacing: '1px',
    width: '10rem',
    height: '3.5rem',
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
