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

      <div id={props.secAni} >
        <IconContext.Provider value={{ className:"cookie-icon" }}>

          <BiCookie />

        </IconContext.Provider>
      </div>

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


        <i className="fas fa-trash-alt" style={{marginLeft:'10px'}} onClick={()=>{
          setVisible(false);
          timerId=setTimeout(()=>{setVisible(true);},1000);
          props.delete(props.array[props.index]._id)
        }}/>
      </Animated>
    </div>
  );
}

export default TheCookie;
