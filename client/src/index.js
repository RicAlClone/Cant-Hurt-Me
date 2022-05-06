import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import AuthProvider from './Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDom.render(
    <AuthProvider>
      <App/>
    </AuthProvider>
,
 document.getElementById("root")
);
