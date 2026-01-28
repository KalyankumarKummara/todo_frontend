import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", 
    },
    secondary: {
      main: "#2563EB", 
    },
    success: {
      main: "#059669", 
    },
    error: {
      main: "#DC2626", 
    },
    background: {
      default: "#F1F5F9", 
      paper: "#FFFFFF",   
    },
    text: {
      primary: "#0F172A", 
      secondary: "#334155", 
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: { fontFamily: "Poppins, sans-serif" },
    h2: { fontFamily: "Poppins, sans-serif" },
    h3: { fontFamily: "Poppins, sans-serif" },
    button: { fontFamily: "Inter, sans-serif", textTransform: "none" },
  },
  shape: {
    borderRadius: 12, 
  },
});
export default theme;
