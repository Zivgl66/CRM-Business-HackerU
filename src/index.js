import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
/* axios */
import axios from "axios";
/* redux */
import { Provider } from "react-redux";
import store from "./store/index";
/* import react router dom */
import { BrowserRouter } from "react-router-dom";

/* import bootstrap to react project */
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

/* toastify */
import "react-toastify/dist/ReactToastify.css";

/* axios config */
//add this url before every axios request
//if the url is relative - then axios will ignore this url
axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    //if token saved in localStorage then
    //I want to add the token to the header of the request
    config.headers["x-auth-token"] = token;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
