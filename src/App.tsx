import React from "react";

import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Nav from "./components/nav/Nav";
import ProfileModal from "./components/modals/ProfileModal";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Nav />
            <ProfileModal />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
