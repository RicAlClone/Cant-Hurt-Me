import React, {useState, useContext} from "react";
import AuthService from "../Services/AuthService"
import Message from "./Message";
import {AuthContext} from "../Context/AuthContext";
import {Link} from 'react-router-dom';
import Register from './Register';
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';

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
const [readable,setReadable]=useState(false);

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
      props.history.push('/DailyInstructions');
    }
    else{
      setSignInData({
        username:"",
        password:""
      })
      setMessage(message);
    }
  })
}


  return(
//style={{margin:"0 auto 0 auto",width:"320px",backgroundColor:"pink"}}

  <div className="form-container">
    <form style={{backgroundColor:"white",textAlign:"left",width:"100%",borderRadius:"10px"}}>
      <h2>Login</h2>
      <div className="input-and-label-padding">
        <label>Username</label>
        <input className="inputStyle" style={inputStyle} name="username" onChange={handleChange} value={signInData.username} placeholder="Username" required/>
      </div>

      <div className="input-and-label-padding">
        <label>Password</label>
        <span style={{marginLeft:'15px'}} onClick={()=>!readable?setReadable(true):setReadable(false)}>
          {!readable?<AiFillEye size='25px' />:<AiFillEyeInvisible size='25px'/>}
        </span>
        <input className="inputStyle" style={inputStyle} type={!readable?"password" :"text"} name="password" onChange={handleChange} value={signInData.password} placeholder="Password" required/>
      </div>

      <button onClick={onSubmit} className="btn btn-primary">Login</button>
    </form>

    <p style={{marginTop:'1rem'}}>Dont Have an account? <Link  as={Link} to="/Register"> Register First</Link></p>
    {message? <Message message={message}/>:null}
  </div>
  );
}


export default Login;
