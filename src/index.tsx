import React from "react";
// import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import MovieContextProvider from "./store/movie-context";

const container = document.getElementById("root")!;
const root = createRoot(container);
// ReactDOM.render(
//   <React.StrictMode>
//     <MovieContextProvider>
//       <App />
//     </MovieContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root") as HTMLElement
// );

// const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement );
// root.render( <React.StrictMode> <App /> </React.StrictMode> );
root.render(
  <React.StrictMode>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
