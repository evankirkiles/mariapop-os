import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./styles/globals.scss";
import "./styles/fonts.scss";
import Desktop from "./views/Desktop";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { persistedStore, store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APPS } from "./components/_apps";
import Window from "./components/Window/Window";
import supabase from "./api/supabase";
import SetPasswordView from "./views/SetPassword";
import { ThemeContextProvider } from "./contexts/useThemeContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Desktop />,
  },
  {
    path: "/set_password",
    element: <SetPasswordView />,
  },
  ...APPS.map(({ name, title, component }) => ({
    path: name,
    element: (
      <Window
        draggable={false}
        resizable={false}
        title={title}
        defaultPos={{ x: 0, y: 0, width: "auto", height: "auto" }}
      >
        {React.createElement(component)}
      </Window>
    ),
  })),
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SessionContextProvider supabaseClient={supabase}>
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <ThemeContextProvider>
              <RouterProvider router={router} />
            </ThemeContextProvider>
          </QueryClientProvider>
        </SessionContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
