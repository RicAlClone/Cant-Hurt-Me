import React from "react";
import {BiCookie} from 'react-icons/bi';
import { IconContext } from "react-icons";
function TheCookie(props){

  return (
    <div className="text-cookie-container">

      <div id={props.secAni} >
        <IconContext.Provider value={{ className:"cookie-icon" }}>
          
          <BiCookie />

        </IconContext.Provider>
      </div>
      <h2 className= "cookie-text">{
        props.array[props.index].cookie
        // props.element
      }</h2>

      <i className="fas fa-trash-alt" style={{marginLeft:'10px'}} onClick={()=>props.delete(props.array[props.index]._id)}/>

    </div>
  );
}

export default TheCookie;
