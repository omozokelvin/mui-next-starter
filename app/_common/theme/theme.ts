'use client';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import { Inter } from 'next/font/google';
import { CSSProperties } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      // gradient: CSSProperties['backgroundImage'];
      animatedText: {
        background: CSSProperties['background'];
        WebkitBackgroundClip: CSSProperties['WebkitBackgroundClip'];
        WebkitTextFillColor: CSSProperties['WebkitTextFillColor'];
        animation: CSSProperties['animation'];
        '@keyframes gradient-text': any;
      };
      // gold: ColorPartial;
      // purple: ColorPartial;
    };
  }
  // allow configuration using `createTheme`
  // eslint-disable-next-line
  interface ThemeOptions extends Partial<Theme> {}

  interface Palette {
    gold: ColorPartial;
    purple: ColorPartial;
  }

  // eslint-disable-next-line
  interface PaletteOptions extends Partial<Palette> {}

  interface TypographyVariants {
    details: CSSProperties;
    title: CSSProperties;
  }

  interface TypographyVariantsOptions extends Partial<TypographyVariants> {}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    details: true;
    title: true;
  }
}

// Create a theme instance.
export const theme = createTheme({
  palette: {
    background: {
      default: '#f6f7f9',
    },
    primary: {
      main: '#54AB6A',
    },
    secondary: {
      main: '#d0c099',
    },
    info: {
      main: '#d0c099',
      light: '#e9f5fe',
    },
    error: {
      main: red.A400,
      light: '#feeceb',
    },
    common: {
      black: '#1D2541',
      // white: '#F1F5F7',
      white: '#FFFFFF',
    },
    grey: {
      900: '#0E0416',
      // 800: '#2E2F35',
    },
    text: {
      primary: '#0E0416',
    },
    gold: {
      800: '#413B2C',
      700: '#716750',
      200: '#EEE7D8',
      100: '#f7f4ee',
    },
    purple: {
      900: '#0E0416',
      800: '#2B0D45',
      700: '#481674',
      300: '#BB88E6',
      100: '#F3E9FB',
    },
  },
  typography: {
    fontFamily: `Clash Grotesk, ${inter.style.fontFamily}`,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '24px',
          boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
          borderRadius: '16px',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'unset',
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': { border: 0 },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          'tr td': {
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          'tr th': {
            paddingTop: 'unset',
            paddingBottom: 'unset',
            borderBottom: 'unset',
            fontSize: '0.875rem',
          },
          'tr:last-child th': {
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          fontSize: '1rem',
        },
        select: {
          fontSize: '1rem',
        },
        displayedRows: {
          fontSize: '1rem',
        },
        actions: {
          fontSize: '1rem',
          '& MuiSvgIcon-root': {
            width: '1em',
            height: '1em',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
        labelSmall: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#F5F7F9',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          // height: '44px',
          // padding: '5px 10px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          borderWidth: '1px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: `rgba(0, 0, 0, 0.12)`,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '',
          mb: '8px',
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       color: 'white',
    //     },
    //   },
    //   variants: [
    //     {
    //       props: { size: 'large' },
    //       style: {
    //         minWidth: 160,
    //       },
    //     },
    //   ],
    // },
  },
  custom: {
    // gradient: ``,
    animatedText: {
      background: 'linear-gradient(45deg, #54AB6A 30%, #d0c099 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradient-text 10s linear infinite reverse',
      '@keyframes gradient-text': {
        '0%': {
          backgroundPosition: '0% 50%',
        },
        '100%': {
          backgroundPosition: '0% 50%',
        },
      },
    },
  },
});

theme.typography.h1 = {
  ...theme.typography.h1,
  fontSize: '5rem',
  lineHeight: '72px',
  letterSpacing: '-1.5px',
  fontWeight: 'medium',
};

theme.typography.h2 = {
  ...theme.typography.h2,
  fontSize: '3.75rem',
  lineHeight: '72px',
  letterSpacing: '-0.5px',
  fontWeight: 400,
};

theme.typography.h3 = {
  ...theme.typography.h3,
  fontSize: '3rem',
  lineHeight: '48px',
  letterSpacing: '0px',
  fontWeight: 400,
};

theme.typography.h4 = {
  ...theme.typography.h4,
  fontSize: '2.125rem',
  lineHeight: '36px',
  fontWeight: 400,
  letterSpacing: '0px',
  // [theme.breakpoints.down('md')]: {
  //   ...theme.typography.h5,
  // },
};

theme.typography.h5 = {
  ...theme.typography.h5,
  fontSize: '1.5rem',
  lineHeight: '32px',
  fontWeight: 400,
  letterSpacing: '0.18px',
};

theme.typography.h6 = {
  ...theme.typography.h6,
  fontSize: '1.25rem',
  lineHeight: '28px',
  letterSpacing: '0.15px',
  fontWeight: 400,
};

theme.typography.body2 = {
  ...theme.typography.body2,
  fontSize: '0.875rem',
  lineHeight: '20px',
  letterSpacing: '0.25px',
};

theme.typography.body1 = {
  ...theme.typography.body1,
  fontSize: '1rem',
  lineHeight: '24px',
  letterSpacing: '0.15px',
  // [theme.breakpoints.down('md')]: {
  //   ...theme.typography.body2,
  // },
};

theme.typography.subtitle1 = {
  ...theme.typography.subtitle1,
  fontSize: '1rem',
  lineHeight: '24px',
  letterSpacing: '0.15px',
};

theme.typography.subtitle2 = {
  ...theme.typography.subtitle2,
  fontSize: '0.875rem',
  lineHeight: '24px',
  letterSpacing: '0.1px',
};

theme.typography.details = {
  ...theme.typography.caption,
  fontWeight: 400,
  fontSize: '0.875rem',
  lineHeight: '24px',
};

theme.typography.title = {
  ...theme.typography.h4,
  fontSize: '1.75rem',
  lineHeight: '40px',
};
