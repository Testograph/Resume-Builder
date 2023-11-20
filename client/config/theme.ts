import { createTheme, ThemeOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
    'tl-sm': true;
    'tl-md': true;
    'tl-lg': true;
    'tl-xl': true;
    'tl-2xl': true;
  }
}
const defaultTheme = createTheme();

const theme: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: '"IBM Plex Sans", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '6px 20px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          boxShadow: 'none !important',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 30,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 40,
        },
        paper: {
          border: 'none',
        },
      },
    },
    MuiModal: {
      defaultProps: {
        componentsProps: {
          backdrop: {
            className: 'backdrop-blur-sm',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      mobile: 0,
      tablet: 768, //mui - sm || tailwind - md
      laptop: 1024, //mui - md || tailwind - lg
      desktop: 1200, // mui - lg || tailwind - xl
      'tl-sm': 640, // tailwind - sm
      'tl-md': 768, // tailwind - md
      'tl-lg': 1024, // tailwind - lg
      'tl-xl': 768, // tailwind - xl
      'tl-2xl': 1280, // tailwind - 2xl
    },
  },
};

export const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: 'light',
    background: { default: '#fafafa', paper: '#f4f4f5' },
    primary: { main: '#18181b' },
    secondary: { main: '#14b8a6' },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    background: { default: '#09090b', paper: '#18181b' },
    primary: { main: '#f4f4f5' },
    secondary: { main: '#0d9488' },
  },
});
