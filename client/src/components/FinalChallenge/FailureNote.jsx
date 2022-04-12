import React,{useState,useRef,useEffect} from "react";
import {Animated} from "react-animated-css";

function FailureNote(props){
  const [visible,setVisible]=useState(true);
let timerId=useRef(null);

  let day= props.item.date;
  let regex= /(\d+)\W(\d+)\W(\d+)/;
  let redone=day.replace(regex,'$2-$3-$1');

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
},[])

function noteDelete(){
  setVisible(false);
  timerId=setTimeout(()=>{setVisible(true);},1000);
  props.delete(props.id);
}

const indent={
  textIndent:"30px"
}
return(
  <div className="col-lg-12" >
    <Animated
      animationIn="fadeIn"
      animationOut="bounceOut"
      animationInDuration={1000}
      animationOutDuration={1000}
      isVisible={visible}
    >
      <div className="note-container">
        <div className="note" >

          <b>Challenge Name:</b>
          <p style={indent}>{props.item.title}</p>

          <b>Positives:</b>
          <p style={indent}>{props.item.positives}</p>

          <b>Mindset:</b>
          <p style={indent}>{props.item.mindset}</p>

          <b>Fixes:</b>
          <p style={indent}>{props.item.fixes}</p>

          <span><b>Give it another try on, </b></span>
          <span><b>{redone}</b></span>

          <div style={{paddingTop:"20px"}}><i className="fas fa-trash-alt delete-bottom-right" onClick={noteDelete}/></div>

        </div>
      </div>
    </Animated>
  </div>
);

}

export default FailureNote;
