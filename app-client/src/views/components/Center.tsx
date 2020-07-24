import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

interface CenterProps {
  children: React.ReactNode;
}

const Center: React.FC<CenterProps> = (props: CenterProps): JSX.Element => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

export default Center;
