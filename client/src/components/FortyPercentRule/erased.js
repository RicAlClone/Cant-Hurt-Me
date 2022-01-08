// import React,{useState} from "react";
// //,{useState}
// import Sets from "./Sets";
// import Reps from "./Reps";
// import Hrs from "./Hrs";
// import Min from "./Min";
// import Sec from "./Sec";


function FormData(props){

//use props.array to send when we click save.see if it works
//props element brings back th previous element.
//i might have to make a function so everytime a component changes, then
// the

const [toUpdate,setToUpdate]=useState({
  title:props.title,
  sets:props.sets,
  reps:props.reps,
  hrs:props.hrs,
  mins:props.mins,
  sec:props.sec
})


const [temp,setTemp]=useState(true);

function handleDelete(e){
  return props.delete(e,props.id);
}

function edit(){
setTemp(false);
}

function handleUpdateChange(){

setToUpdate({
  title:props.title,
  sets:Number(sets),
  reps:Number(repsValue),
  hrs:Number(props.hrs),
  mins:Number(props.mins),
  sec:Number(props.sec)
})
}



  return(

<div className="col-lg-4" >
  <div className="note-container">
    <div className="note">

      {/* //send an object to be req.body, when we click on save it sends that as well.
      */}
      <h1>{toUpdate.title}</h1>
      <p>*Gradually increment by 5-10%</p>
      {/* <span>
        <Sets
          sets={toUpdate.sets}
          temp={temp}
          handleUpdateChange={handleUpdateChange}
        />

        </span>

        <span>
        <Reps
          reps={toUpdate.reps}
          temp={temp}
          handleUpdateChange={handleUpdateChange}
        />
        </span>


        <span>
        <Hrs
          hrs={toUpdate.hrs}
          temp={temp}
        />
        </span>
        <span>
        <Min
          min={toUpdate.mins}
          temp={temp}
        />
        </span>
        <span>
        <Sec
          sec={toUpdate.sec}
          temp={temp}
        />
      </span> */}

      {/* <button onClick={handleDelete} className="btn btn-primary">delete</button> */}
      <i className="fas fa-trash-alt delete-bottom-right" onClick={handleDelete} />
      <p onClick={edit}>edit</p>
      <p onClick={()=>{props.updateNote(props.id,toUpdate)}}>save</p>

</div>
</div>
</div>
  );
}

export default FormData;
