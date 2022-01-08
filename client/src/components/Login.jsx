import React, {useState, useContext} from "react";
import AuthService from "../Services/AuthService"
import Message from "./Message";
import {AuthContext} from "../Context/AuthContext";

function Login(props){

let center={
  margin:"0 auto 0 auto",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor: "green",
  width:"320px",
  height:"320px",
  padding:"10px"
}
let inputStyle={
  width:"100%",
  display:"block"
}


const [signInData,setSignInData]=useState(
  {
    username: "",
    password: ""
  }
);

const [message, setMessage]= useState(null);

const authContext = useContext(AuthContext);



function handleChange(event){
  let value=event.target.value;
  let name=event.target.name;

  setSignInData((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
}

function onSubmit(e){
  // i want to look up what preventDefault works
  e.preventDefault();
  AuthService.login(signInData).then(data=>{
    const {isAuthenticated, message} = data;
    if(isAuthenticated){
      authContext.setUser(signInData);
      authContext.setIsAuthenticated(isAuthenticated);
      props.history.push('/badhand');
    }
    else{
      setSignInData({
        username:"",
        password:""
      })
      setMessage(message);
      console.log(message);
    }
  })
}


  return(
//style={{margin:"0 auto 0 auto",width:"320px",backgroundColor:"pink"}}

  <div style={center}>
    <form style={{textAlign:"center",width:"100%"}}>
      <h2>Login</h2>
      <input name="username" onChange={handleChange} value={signInData.username} style={inputStyle} placeholder="Username" required/>
      <input type="password" name="password" onChange={handleChange} value={signInData.password} style={inputStyle} placeholder="Password" required/>
      <button onClick={onSubmit} className="btn btn-primary">Login</button>
    </form>
    {message? <Message message={message}/>:null}
  </div>
  );
}


export default Login;
