import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    width: '50%',
  },
  inputField: {
  },
});

const Signup = (): ReactElement => {
  const classes = useStyles();
  const [value, setValue] = React.useState('email address');
  const [password, setPassword] = React.useState('password');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box display="flex">
      <form className={classes.root}>
        <div className={classes.inputField}>
          <TextField id="email" variant="outlined" value={value} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div>
          <TextField id="password" variant="outlined" value={password} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
      </form>
    </Box>
  );
};

export default Signup;
