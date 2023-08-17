import React,{useRef,useEffect} from "react";
import {BiCookie} from 'react-icons/bi';
import { IconContext } from "react-icons";


function TheCookie(props){

let timerId=useRef(null);

let movingTranslate=[
{
    opacity: 1
},
{
    opacity:0
}
];
let detailMovement={
  duration:1000,
  fill: 'forwards'
}

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

      <div className='text-container' key={props.id}>

        <h2 className= "cookie-text">{
            props.array[props.index].cookie

        }</h2>

        <i className="fas fa-trash-alt" style={{display:'block',textAlign:'right'}} onClick={(e)=>{

          let targetComponent=e.target.parentElement.children[0];
          
          targetComponent.animate(movingTranslate,detailMovement);
          props.delete(props.id)

        }}/>

      </div>
    </div>
  );
}

export default TheCookie;
