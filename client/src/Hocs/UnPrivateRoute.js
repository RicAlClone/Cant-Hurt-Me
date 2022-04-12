import React,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";


function UnPrivateRoute({component:Component,...rest}){

  const {isAuthenticated}=useContext(AuthContext);

  return(
    <Route
      {...rest}
      render={props=>{
        if(isAuthenticated){
          return(

            <Redirect
              to={{pathname:'/',state:{from:props.location}}}
            />
          );
        }
        //Component is a new variable which is created with the value of either component Register or Login
        //so this new Componenet will take us either to /register or /login

        return <Component {...props}/>
      }}
    />
  );

}
export default UnPrivateRoute;
