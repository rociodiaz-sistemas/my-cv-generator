import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#374478", // Global background (e.g., body)
      paper: "#FFFFFF", // Card background, etc.
    },
    primary: {
      main: "#1d1d61", // Buttons, AppBar, etc.
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#f4d532", // Accent
    },
    text: {
      primary: "#2F3A4A", // Default text color
    },
  },
  typography: {},
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#F6F5F4",
          backgroundImage: `
                radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0),
                radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0)
              `,
          backgroundSize: "10px 10px",
          backgroundPosition: "0 0, 5px 5px",
        },
      },
    },
  },
});
