import { createMuiTheme } from '@material-ui/core/styles';
import * as COLORS from './colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      dark: COLORS.primaryDark,
    },
    secondary: {
      main: COLORS.secondaryLight,
      dark: COLORS.secondaryDark,
    },
  },
});

export default theme;
