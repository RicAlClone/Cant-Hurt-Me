import React,{useState,useRef,useEffect} from "react";
import {Animated} from "react-animated-css";

function Note(props){

  const [visible,setVisible]=useState(true);
let timerId=useRef(null);

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
});

  function dateFunc(str) {
    let fixRegex = /(\w+)-(\w+)-(\w+)/; // Change this line
    let replaceText = "$2-$3-$1"; // Change this line
    let result = str.replace(fixRegex, replaceText);
    return result;

  }

function handleDelete(){
  setVisible(false);
  timerId=setTimeout(()=>{setVisible(true);},1000);
  props.deleteJournalEntry(props.id);
}

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
          <h6>{dateFunc(props.calendar)}</h6>
          <p className="mirror-note-title">{props.title}</p>
          <p>{props.paragraph}</p>
          <i className="fas fa-trash-alt delete-bottom-right" onClick={handleDelete} />
        </div>
      </div>
    </Animated>
  </div>

);

}

export default Note;
