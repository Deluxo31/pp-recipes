import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e", // свежий зеленый для ПП
    },
    secondary: {
      main: "#10b981", // мятный
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  shape: {
    borderRadius: 12,
  },
})