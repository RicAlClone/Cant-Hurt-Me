import React,{useState} from "react";

function Min(props){

  const [min, newMin]=useState(parseInt(props.min));

  function setDataChange(event){
    const newValue= parseInt(event.target.value);
    newMin(newValue);
  }
  // here i want to make a function and be able to pass it over to Hrs.jsx
  if(min === 60){
    //it will return 1
    console.log("add 1 to hr");
  }
  return(
    <div >
      {
        props.min!==""?
          <div> <input style={{width:"55px"}} type="number" min="0" max="60" onChange={setDataChange} value={min} disabled={props.temp}/> <span style={{paddingRight:"20px"}}>mins</span>
            </div>
        : props.min
      }
</div>
  );
}

export default Min;
