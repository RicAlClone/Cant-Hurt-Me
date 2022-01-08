import React,{useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

//1. what does Route do?
    //Its most basic responsibility is to render some UI when its path matches the current URL.

//2. what does Redirect and to:object do?
    //Rendering a <Redirect> will navigate to a new location. The new location will override the
    //current location in the history stack, like server-side redirects (HTTP 3xx) do.
    //A location to redirect to. pathname can be any valid URL path that path-to-regexp@^1.7.0 understands.
    //The state object can be accessed via this.props.location.state in the redirected-to component. This new
    //referrer key (which is not a special name) would then be accessed via this.props.location.state.referrer
    //in the Login component pointed to by the pathname '/login'

//3.how we use our parameter?
    //stackoverflow article talkiing about the parameter is ->
    //https://stackoverflow.com/questions/43484302/what-does-rest-mean-in-react-jsx


//5.what is render props?
    //This allows for convenient inline rendering and wrapping without the undesired remounting explained
    //above. Instead of having a new React element created for you using the component prop, you can pass
    //in a function to be called when the location matches. The render prop function has access to all the
    //same route props (match, location and history) as the component render prop.


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

        console.log(props);
        return <Component {...props}/>
      }}
    />
  );

}
export default UnPrivateRoute;
