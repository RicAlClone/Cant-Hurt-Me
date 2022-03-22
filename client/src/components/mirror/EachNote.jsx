import React from "react";


function EachNote(props){


  return(

    <div className="col-lg-4" >
      <div className="note-container">
        <div className="note" >
          <p className="mirror-note-title">{props.title}</p>
          <p className="mirror-paragraph">{props.message}</p>
          <i className="fas fa-trash-alt delete-bottom-right" onClick={()=>{
            props.deleteNote(props.id);
          }}></i>
        </div>
      </div>
    </div>
    );
}

export default EachNote;
