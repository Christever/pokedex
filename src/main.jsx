import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
        <ToastContainer
            theme="colored"
            position="bottom-right"
            autoClose="1000"
        />
    </React.StrictMode>
);
