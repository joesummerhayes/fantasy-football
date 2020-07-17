import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface TitleProps {
  text: string;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    letterSpacing: '0.1rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
}));

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const classes = useStyles();
  const { text, className = '' } = props;
  return (
    <div className={`${classes.root} ${className}`}>
      {text}
    </div>
  );
};

export default Title;
