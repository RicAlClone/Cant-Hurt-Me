import React from "react";


function Note(props){

  function dateFunc(str) {
    let fixRegex = /(\w+)-(\w+)-(\w+)/; // Change this line
    let replaceText = "$2-$3-$1"; // Change this line
    let result = str.replace(fixRegex, replaceText);
    
    return result;

  }

function handleDelete(){

  props.deleteJournalEntry(props.id);
}

return(
  <div className="col-lg-3" >
    <div className="note-container">
      <div className="note" >
        <h3>{dateFunc(props.calendar)}</h3>
        <h1>{props.title}</h1>
        <p>{props.paragraph}</p>
        <i className="fas fa-trash-alt delete-bottom-right" onClick={handleDelete} />
      </div>
    </div>
  </div>

);

}

export default Note;
