import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Center from '../components/Center';
import Button from '../components/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '70vh',
  },
}));

const LineUpField: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const onButtonClick = (): void => {
    console.log('click');
  };

  return (
    <Box className={classes.root}>
      <Center>
        <Button text="Join / Create League" onClick={onButtonClick} bigButtonDark />
      </Center>
    </Box>
  );
};

export default LineUpField;
