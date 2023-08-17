import React,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

//the props are being destructored and component is being given a value
//of Component with capital C to return Badhands component.
//roles returns the roles attribute
//path will be included with ...rest
function PrivateRoute({component:Component,roles,...rest}){

  const {isAuthenticated}= useContext(AuthContext);

  return(
  //props is an object of with properties of history: , location:, and match:
  //this object, which includes information about the current route
    <Route {...rest} render={props=> {

      if(!isAuthenticated){

        return <Redirect
          to={{pathname:'/login', state:{from:props.location}}}
               />
      }else{
        // e.g this would return <BadHand> with all its props
        //When adding a component the rule states the name should be capital thats
        // why we re-assign the component prop to Component
        return <Component {...props}/>
      }
    }}/>

  );
}

export default PrivateRoute;
