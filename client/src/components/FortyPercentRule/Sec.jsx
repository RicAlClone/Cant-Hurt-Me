import React,{useState} from "react";

function Sec(props){

  const [sec, newSec]=useState(parseInt(props.sec));

  function setDataChange(event){
    const newValue= parseInt(event.target.value);
    newSec(newValue);
  }


  return(
    <div >
      {
        props.sec!==""? <div> <input style={{width:"55px"}} type="number" min="0" max="60" onChange={setDataChange} value={sec} disabled={props.temp}/> <span style={{paddingRight:"20px"}}>sec</span>
          </div>
        : props.sec
      }
</div>
  );
}

export default Sec;
