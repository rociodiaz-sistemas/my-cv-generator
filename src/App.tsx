import React from "react";

import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Home />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
