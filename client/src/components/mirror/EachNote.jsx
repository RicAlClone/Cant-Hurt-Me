import React,{useState,useRef,useEffect} from "react";
import {Animated} from "react-animated-css";

function EachNote(props){

  const [visible,setVisible]=useState(true);
  let timerId=useRef(null);

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
},[])

  return(

    <div className="col-lg-4" >
      <Animated
        animationIn="fadeIn"
        animationOut="bounceOut"
        animationInDuration={1000}
        animationOutDuration={1000}
        isVisible={visible}
      >
        <div className="note-container">
          <div className="note" >
            <p className="mirror-note-title">{props.title}</p>
            <p className="mirror-paragraph">{props.message}</p>
            <i className="fas fa-trash-alt delete-bottom-right" onClick={()=>{
              setVisible(false);
              timerId=setTimeout(()=>{setVisible(true);},1000);
              props.deleteNote(props.id);
            }}></i>
          </div>
        </div>
      </Animated>
    </div>
    );
}

export default EachNote;
