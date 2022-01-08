import React from "react";

function FailureNote(props){

function noteDelete(){
  props.delete(props.id);
}


return(
  <div className="col-lg-4" >
    <div className="note-container">
      <div className="note" >
        <p>{props.item.note}</p>
        <p><b>Give it another shot on</b></p>
        <p><b>{props.item.date}</b></p>
        <i className="fas fa-trash-alt delete-bottom-right" onClick={noteDelete}/>
      </div>
    </div>
  </div>
);

}

export default FailureNote;
