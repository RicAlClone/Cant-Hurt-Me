import React,{useState} from "react";

function Hrs(props){
//we want to add 1 to hrs
  const [hrs, newHrs]=useState(parseInt(props.hrs));


  function setDataChange(event){
    const newValue= parseInt(event.target.value);
    newHrs(newValue);
  }
  //the data type is a number. can we console log the new value of the form? or see whats it at when we
  //change the numbers?
  return(
    <div>
      {
        props.hrs!==""?
          <div> <input style={{width:"55px"}} type="number" min="0" onChange={setDataChange} value={hrs} disabled={props.temp}/> <span style={{paddingRight:"20px"}}>hrs</span>
          </div>
        : props.hrs
      }
    </div>
  );
}

export default Hrs;
