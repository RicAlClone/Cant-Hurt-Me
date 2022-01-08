//we want to be able to send our text to the server get it
//comfirmed and we get sent to the login page

//we need authService to send our username and password
//we probably wont need authcontext since we wont get authenticated till
//after we login



import React, {useState,useRef,useEffect} from "react";
import AuthService from '../Services/AuthService';
import Message from "./Message";

function Register(props){

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


const [registerData,setRegisterData]=useState(
  {
    username: "",
    password: ""
  }
);

const [message, setMessage]= useState(null);

let timerId= useRef(null);
useEffect(()=>{
  return ()=>{
    console.log('this is when timer is cleared in useEffect');
    clearTimeout(timerId);
  }
},[]);

function handleChange(event){
  let value=event.target.value;
  let name=event.target.name;

  setRegisterData((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
}

function onSubmit(e){
e.preventDefault();
console.log(registerData);
AuthService.register(registerData).then(data=>{

const {message}=data;
if(!message.msgError){
  setMessage(message);
console.log(message);
timerId= setTimeout(()=>{
  props.history.push('/Login')
},5000)
}
else{
  //if not able to register send back Message
  console.log(message);

    setMessage(message);
    setRegisterData({
      username: "",
      password: ""
    });

}
})

}
  return(

  <div style={center}>
    <form style={{textAlign:"center",width:"100%"}}>
      <h2>Register</h2>
      <input name="username" onChange={handleChange} value={registerData.username} style={inputStyle} placeholder="Username" required/>
      <input type="password" name="password" onChange={handleChange} value={registerData.password} style={inputStyle} placeholder="Password" required/>
      <button onClick={onSubmit} className="btn btn-primary">Register</button>
    </form>
    {message ?
      <Message
        message={message}/>
    : null
    }
  </div>

  );
}


export default Register;
