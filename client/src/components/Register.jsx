
import React, {useState,useRef,useEffect} from "react";
import AuthService from '../Services/AuthService';
import Message from "./Message";

function Register(props){


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
const [clickAdd,setClickAdd]=useState(null);
const [usernameCheck,setUserNameCheck]=useState(false);
const [passwordCheck, setPasswordCheck]=useState(false);

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
setClickAdd(true);
console.log(registerData);
AuthService.register(registerData).then(data=>{
//if message equals err username then set
const {message}=data;
const usernameVal='Username requires 6 characters or more';
const passwordVal='Password requires 8 characters or more';
const bothVal="Username should be 6 character or more. Password should be 8 characters or more";

console.log('message.msgBody',message.msgBody);
//this means everything went well
if(!message.msgError){
  setUserNameCheck(false);
  setPasswordCheck(false);
  setMessage(message);
console.log(message);
timerId= setTimeout(()=>{
  props.history.push('/Login')
},5000)
}
//if we get erros we fall in error

  else if(message.msgBody ==bothVal){
    setUserNameCheck(true);
    setPasswordCheck(true);

  }
  else if(message.msgBody == usernameVal){
    setUserNameCheck(true);
    setPasswordCheck(false);

  }
  else if(message.msgBody == passwordVal){
    setPasswordCheck(true);
    setUserNameCheck(false);

  }

    else{

      setRegisterData({
        username: "",
        password: ""
      });
    }
setMessage(message);
})

}

console.log('usernameCheck',usernameCheck);
console.log('passwordCheck',passwordCheck);
console.log('clickAdd:',clickAdd)

const exlamMark={
  fontSize:"1.2rem",
  color:"#bf2121",
  opacity: "0.6",
  marginLeft:"0.8rem"

}

  return(

  <div className="form-container">
    <form style={{backgroundColor:"white",textAlign:"left",width:"100%",borderRadius:"10px"}}>
      <h2>Register</h2>

      <div className="input-and-label-padding">
        <label for='usernameRegister'>Username</label>
        {clickAdd&&usernameCheck ? <span style={exlamMark}><i class="fas fa-exclamation-circle"></i></span> : null}
        <input className="inputStyle" id='usernameRegister' name="username" onChange={handleChange} value={registerData.username} style={inputStyle} placeholder="Username" required/>
      </div>
      {/* <span style={{fontSize:"20px",color:'black'}}> <i class="fa-solid fa-cloud-xmark"></i></span>  */}
      <div className="input-and-label-padding">
        <label>Password</label>
        {clickAdd&&passwordCheck ? <span style={exlamMark}><i class="fas fa-exclamation-circle"></i></span> : null}
        <input className="inputStyle" type="password" name="password" onChange={handleChange} value={registerData.password} style={inputStyle} placeholder="Password" required/>
      </div>

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
