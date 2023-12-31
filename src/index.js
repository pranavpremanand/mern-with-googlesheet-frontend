import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initialState, reducer } from "./Reducer";
import { StateProvider } from "./StateProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
