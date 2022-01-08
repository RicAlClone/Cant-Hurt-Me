import React,{useState} from "react";


function FormData(props){

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

function setDataChange(e){
const {name,value}= e.target;
setToUpdate((prev)=>{
  return{
    ...prev,
    [name]:value
  }

})
}



  return(

<div className="col-lg-4" >
  <div className="note-container">
    <div className="note">

      <h1 name="title">{toUpdate.title}</h1>
      <p>*Gradually increment by 5-10%</p>

      {
        toUpdate.sets !== null?
          <div>
            <input name="sets" style={{width:"55px"}} type="number" min="0" onChange={setDataChange} value={toUpdate.sets}  disabled={temp}/> <span style={{paddingRight:"20px"}}>sets</span>
          </div>
        : null
      }

      {
        toUpdate.reps !==null?
          <div>
            <input name="reps" type="number" min="0" onChange={setDataChange}  style={{width:"55px"}} value={toUpdate.reps} disabled={temp}/>
            <span style={{paddingRight:"20px"}}> reps</span>
          </div>
        : null
      }

      {
        toUpdate.hrs!==null?
          <div>
            <input name="hrs" style={{width:"55px"}} type="number" min="0" onChange={setDataChange} value={toUpdate.hrs} disabled={temp}/> <span style={{paddingRight:"20px"}}>hrs</span>
          </div>
        : null
      }

      {
        toUpdate.mins!==null?
          <div>
            <input name="mins" style={{width:"55px"}} type="number" min="0" max="60" onChange={setDataChange} value={toUpdate.mins} disabled={temp}/> <span style={{paddingRight:"20px"}}>mins</span>
          </div>
        :   null
      }

      {
        toUpdate.sec!==null?
          <div>
            <input name="sec" style={{width:"55px"}} type="number" min="0" max="60" onChange={setDataChange} value={toUpdate.sec} disabled={temp}/> <span style={{paddingRight:"20px"}}>sec</span>
          </div>
        : null
      }

      <i className="fas fa-trash-alt delete-bottom-right" onClick={handleDelete} />
      <p onClick={edit}>edit</p>
      <p onClick={()=>{props.updateNote(props.id,toUpdate)}}>save</p>

</div>
</div>
</div>
  );
}

export default FormData;
