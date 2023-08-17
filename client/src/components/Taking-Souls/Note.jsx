import React,{useRef,useEffect} from "react";

function Note(props){

let timerId=useRef(null);

let movingTranslate=[
{
  opacity:1
},
{
  opacity:0
}
];
let detailMovement={
  duration:500,
  fill: 'forwards'
}

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
},[]);

  function dateFunc(str) {
    let fixRegex = /(\w+)-(\w+)-(\w+)/;
    let replaceText = "$2-$3-$1";
    let result = str.replace(fixRegex, replaceText);
    return result;
  }

return(
  <div className="col-lg-4" >

    <div className="note-container">
      <div key={props.id} className="note" >
        {/* dateFunc(props.calendar.slice(0,10)) */}
        <h6>{dateFunc(props.calendar.slice(0,10))}</h6>
        <p className="mirror-note-title">{props.title}</p>
        <p>{props.paragraph}</p>
        <i className="fas fa-trash-alt delete-bottom-right" onClick={(e)=>{

          let targetDiv=e.target.parentElement;
          
          targetDiv.animate(movingTranslate,detailMovement);
          props.deleteJournalEntry(props.id);
        }}></i>
      </div>
    </div>

  </div>

);

}

export default Note;
