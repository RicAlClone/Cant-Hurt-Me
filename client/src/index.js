import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import AuthProvider from './Context/AuthContext';


ReactDom.render(
    <AuthProvider>
      <App/>
    </AuthProvider>
,
 document.getElementById("root")
);
