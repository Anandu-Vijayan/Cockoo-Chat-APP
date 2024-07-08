
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/auth/Routes";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <h1> Chatter Box! </h1>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
