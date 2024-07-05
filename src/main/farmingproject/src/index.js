import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from "./main";
import Farmer_market from "./farmer_market";
import Farmer_market_info from "./farmer_market_info";
import {BrowserRouter} from "react-router-dom";
import Login from "./login";
import Join_consumer from "./join_consumer";
import Join_seller from "./join_seller";
import Farmer_job from "./farmer_job";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter>
  //   <Farmer_job />
  // </BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
