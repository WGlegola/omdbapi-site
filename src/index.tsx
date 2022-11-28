import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import SearchContextProvider from "./store/search-context";
import { BrowserRouter } from "react-router-dom";
import MovieContextProvider from "./store/movie-context";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <MovieContextProvider>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
      </MovieContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
