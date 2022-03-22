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
  <div className="col-lg-4" >
    <div className="note-container">
      <div className="note" >
        <h6>{dateFunc(props.calendar)}</h6>
        <p className="mirror-note-title">{props.title}</p>
        <p>{props.paragraph}</p>
        <i className="fas fa-trash-alt delete-bottom-right" onClick={handleDelete} />
      </div>
    </div>
  </div>

);

}

export default Note;
