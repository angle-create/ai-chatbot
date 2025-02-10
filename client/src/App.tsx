import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Login } from './components/Login';
import { ChatContainer } from './components/ChatContainer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4285F4', // Google Blue
      light: '#82B1FF',
      dark: '#1A73E8',
    },
    secondary: {
      main: '#34A853', // Google Green
      light: '#66BB6A',
      dark: '#0F9D58',
    },
    background: {
      default: '#202124', // Gemini Dark Background
      paper: '#292A2D', // Gemini Dark Surface
    },
    error: {
      main: '#EA4335', // Google Red
    },
    warning: {
      main: '#FBBC04', // Google Yellow
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: [
      'Google Sans',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 500,
      letterSpacing: 0.15,
    },
    body1: {
      letterSpacing: 0.15,
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
          padding: '8px 24px',
          fontSize: '0.9375rem',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
  },
});

function App() {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {userId ? (
        <ChatContainer userId={userId} />
      ) : (
        <Login onLogin={setUserId} />
      )}
    </ThemeProvider>
  );
}

export default App; 