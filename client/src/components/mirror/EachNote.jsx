import React,{useRef,useEffect} from "react";

function EachNote(props){

  let timerId=useRef(null);

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

  return(

    <div className="col-lg-4" style={{padding:'0'}}>

      <div className="note-container">
        <div data-id={props.id} key={props.id} className="note"  >
          <p className="mirror-note-title">{props.title}</p>
          <p className="mirror-paragraph">{props.message}</p>
          <i className="fas fa-trash-alt delete-bottom-right" onClick={(e)=>{

            let targetDiv=e.target.parentElement;

            targetDiv.animate(movingTranslate,detailMovement);
            props.deleteNote(props.id)

          }}></i>
        </div>
      </div>

    </div>
    );
}

export default EachNote;
