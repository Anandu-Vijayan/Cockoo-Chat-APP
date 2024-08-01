
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/auth/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() { 
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <h1> Chatter Box! </h1>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
