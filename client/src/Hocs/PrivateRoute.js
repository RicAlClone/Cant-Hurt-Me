import React,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

function PrivateRoute({component:Component,roles,...rest}){

  const {isAuthenticated}= useContext(AuthContext);

  return(
    <Route {...rest} render={props=> {

      if(!isAuthenticated){

        return <Redirect
          to={{pathname:'/login', state:{from:props.location}}}
               />
      }

      //if someone is trying to enter the admin page then
      //this is where the mernJwt project says if its not user
      //then go back home. If all the statements dont pass then
      //it will take us to our admin component. Since we dont have
      //roles we are checking if it is authenticated. if it is then we
      //return our component below.

      return <Component {...props}/>
    }}/>

  );
}

export default PrivateRoute;
