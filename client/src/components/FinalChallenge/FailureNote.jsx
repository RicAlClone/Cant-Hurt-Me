import React,{useRef,useEffect} from "react";

function FailureNote(props){
let timerId=useRef(null);

  let day= props.item.date;
  let regex= /(\d+)\W(\d+)\W(\d+)/;
  let redone=day.replace(regex,'$2-$3-$1');

  let movingTranslate=[
  {
    opacity: 1
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
},[])

function noteDelete(e){
  let targetDiv=e.target.parentElement.parentElement;
  targetDiv.animate(movingTranslate,detailMovement);
  props.delete(props.id);
}

const indent={
  textIndent:"30px"
}
return(
  <div className="col-lg-12" >

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

  </div>
);

}

export default FailureNote;
