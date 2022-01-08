import React,{useState,useEffect} from "react";

function Reps(props){
  const [repsValue, setRepsValue]=useState(parseInt(props.reps))

  useEffect(()=>{
    handle(repsValue);
  },[repsValue])

//so when our data is changed we can make a request to server on and update on
//reps value.
  function setDataChange(event){
    const newValue= parseInt(event.target.value);
    setRepsValue(newValue);
  }

function handle(){
  props.handleUpdateChange(repsValue);
}

  return(
    <div>
      {
        props.reps !==""?
          <div>
            <input type="number" min="0" onChange={setDataChange} value={repsValue} style={{width:"55px"}} disabled={props.temp}/>
            <span style={{paddingRight:"20px"}}> reps</span>
          </div>
        : props.reps
      }
    </div>
      );
}

export default Reps;
