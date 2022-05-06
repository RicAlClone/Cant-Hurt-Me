import React,{useState,useRef,useEffect} from "react";
import {BiCookie} from 'react-icons/bi';
import { IconContext } from "react-icons";
import {Animated} from "react-animated-css";


function TheCookie(props){

  const [visible,setVisible]=useState(true);

let timerId=useRef(null);

useEffect(()=>{
  return()=>{
    clearTimeout(timerId);
  }
},[])

  return (
    <div className="text-cookie-container">

      <div className="cookie-icon-container" >
        <IconContext.Provider value={{ className:props.secAni }}>
          <BiCookie size='70px'/>
        </IconContext.Provider>
      </div>

      <div className='text-container'>
        <Animated
          animationIn="fadeIn"
          animationOut="bounceOut"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={visible}
        >

          <h2 className= "cookie-text">{
            props.array[props.index].cookie
            // props.element
          }</h2>

          <i className="fas fa-trash-alt" style={{display:'block',textAlign:'right'}} onClick={()=>{
            setVisible(false);
            timerId=setTimeout(()=>{setVisible(true);},1000);
            props.delete(props.array[props.index]._id)
          }}/>
        </Animated>
      </div>
    </div>
  );
}

export default TheCookie;
