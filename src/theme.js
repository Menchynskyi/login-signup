import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#fff3cd',
      primary: '#856404',
      secondary: 'rgba(134, 101, 4, 0.66)'
    },
  },
});

export default theme;