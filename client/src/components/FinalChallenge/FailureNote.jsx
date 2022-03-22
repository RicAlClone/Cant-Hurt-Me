import React from "react";

function FailureNote(props){

//i want to flip the date,example.. 2020-1-12 to 1-12-2020.
//we need to use regex.



  let day= props.item.date;
  let regex= /(\d+)\W(\d+)\W(\d+)/;
  let redone=day.replace(regex,'$2-$3-$1');




function noteDelete(){
  props.delete(props.id);
}

const indent={
  textIndent:"30px"
}
return(
  <div className="col-lg-12" >
    <div className="note-container">
      <div className="note" >

        <strong>Challenge Name:</strong>
        <p style={indent}>{props.item.title}</p>

        <strong>Positives:</strong>
        <p style={indent}>{props.item.positives}</p>

        <strong>Mindset:</strong>
        <p style={indent}>{props.item.mindset}</p>

        <strong>Fixes:</strong>
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
