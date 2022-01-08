import React from "react";


function EachNote(props){


  return(

    <div className="col-lg-3" >
      <div className="note-container">
        <div className="note" >
          <h1 >{props.title}</h1>
          <p>{props.message}</p>
          {/* <button type="button"  className="btn btn-primary">delete</button> */}
          <i className="fas fa-trash-alt delete-bottom-right" onClick={()=>{
            props.deleteNote(props.id);
            // there was a ) extra below between }}
          }}></i>
        </div>
      </div>
    </div>
    );
}

export default EachNote;
