import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/globals.scss";
import "./styles/fonts.scss";
import App from "./App";
import { persistedStore, store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APPS } from "./components/_apps";
import Window from "./components/Window/Window";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
