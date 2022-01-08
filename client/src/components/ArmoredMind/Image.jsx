import React from "react";


let color= {
  backgroundColor: "#dcdee0"
}

function Image(props){
  return(
    <div className="col-lg-4" style={color} >
      <div className="note-container" style={{paddingBottom:"50px"}}>
        <img style={{width: "320px"}} alt="" src={props.arrayItem} />
      </div>
      <i className="fas fa-trash-alt delete-bottom-right" onClick={()=>props.deleteImage(props.id)}/>
    </div>
  );
}

export default Image;
