import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { persistor, store } from "../src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
