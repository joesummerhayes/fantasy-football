import { createMuiTheme } from '@material-ui/core/styles';
import * as COLORS from './colors';

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      light: COLORS.primaryLight,
      dark: COLORS.primaryDark,
    },
    secondary: {
      main: COLORS.secondaryLight,
      dark: COLORS.secondaryDark,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: 1,
});

export const cssVariables = {
  shadowing: {
    boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.3)',
  },
};

export default {};
