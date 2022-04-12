import React,{useState,useRef,useEffect} from "react";
import {Animated} from "react-animated-css";


function ListItem(props){
const [visible,setVisible]=useState(true);

let timerId=useRef(null);

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
},[])

return(
  <Animated
    animationIn="fadeIn"
    animationOut="bounceOut"
    animationInDuration={1000}
    animationOutDuration={1000}
    isVisible={visible}
  >
    <div className="list-entries">
      <li  key={props.id}>
        {props.arrayItem.name}
      </li>
      <i className="fas fa-trash-alt delete-button" onClick={()=> {
        setVisible(false);
        timerId=setTimeout(()=>{setVisible(true);},1000);
        props.deleteItem(props.id)
      }
      }></i>
    </div>
  </Animated>
    );
    }

export default ListItem;
