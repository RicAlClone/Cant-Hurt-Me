import React,{useState,useRef,useEffect} from "react";
import {Animated} from "react-animated-css";


function FormData(props){

const [toUpdate,setToUpdate]=useState({
  title:props.title,
  sets:props.sets,
  reps:props.reps,
  hrs:props.hrs,
  mins:props.mins,
  sec:props.sec
})

const [visible,setVisible]=useState(true);
let timerId=useRef(null);

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
})

const [disabled,setDisabled]=useState(true);

function handleDelete(e){
  props.authCheck();
  setVisible(false);
  timerId=setTimeout(()=>{setVisible(true);},1000);
  return props.delete(e,props.id);
}

function edit(){
  props.authCheck();
setDisabled(false);
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

function editButtonClass(){
  if(disabled){
    return 'btn btn-primary'
  }
  else{
    return 'btn btn-light'
  }
}
function saveButtonClass(){
  if(!disabled){
    return 'btn btn-primary'
  }
  else{
    return 'btn btn-light'
  }
}


  return(

<div className="col-lg-4" >
  <Animated
    animationIn="fadeIn"
    animationOut="bounceOut"
    animationInDuration={1000}
    animationOutDuration={1000}
    isVisible={visible}
  >

    <div className="note-container">
      <div className="note" style={{width:'100%'}}>

        <p className='mirror-note-title' name="title">{toUpdate.title}</p>
        <p>*Gradually increment by 5-10%</p>

        {
          toUpdate.sets !== null?
            <div>
              <input className='inputStyle' name="sets" style={{width:"75px"}} type="number" pattern="\d*" min="0" onChange={setDataChange} value={toUpdate.sets}  disabled={disabled}/> <span style={{paddingRight:"20px"}}>sets</span>
            </div>
          : null
        }

        {
          toUpdate.reps !==null?
            <div>
              <input className='inputStyle' name="reps" type="number" pattern="\d*" min="0" onChange={setDataChange}  style={{width:"75px"}} value={toUpdate.reps} disabled={disabled}/>
              <span style={{paddingRight:"20px"}}> reps</span>
            </div>
          : null
        }

        {
          toUpdate.hrs!==null?
            <div>
              <input className='inputStyle' name="hrs" style={{width:"75px"}} type="number" pattern="\d*" min="0" onChange={setDataChange} value={toUpdate.hrs} disabled={disabled}/> <span style={{paddingRight:"20px"}}>hrs</span>
            </div>
          : null
        }

        {
          toUpdate.mins!==null?
            <div>
              <input className='inputStyle' name="mins" style={{width:"75px"}} type="number" pattern="\d*" min="0" max="60" onChange={setDataChange} value={toUpdate.mins} disabled={disabled}/> <span style={{paddingRight:"20px"}}>mins</span>
            </div>
          :   null
        }

        {
          toUpdate.sec!==null?
            <div>
              <input className='inputStyle' name="sec" style={{width:"75px"}} type="number" pattern="\d*" min="0" max="60" onChange={setDataChange} value={toUpdate.sec} disabled={disabled}/> <span style={{paddingRight:"20px"}}>sec</span>
            </div>
          : null
        }
        {/* //tookout delete-bottom-right on trashcan */}
        <div style={{display:'flex',flexStart:'column',justifyContent:'space-evenly'}}>
          <button  className={editButtonClass()} onClick={edit}>edit</button>
          <button  className={saveButtonClass()} onClick={()=>{
            props.authCheck();
            if(disabled){
              console.log('disabled we cant save');
            }
            else{
              props.updateNote(props.id,toUpdate)
              setDisabled(true);
            }
          }}>save</button>
          <button className='btn btn-light'><i className="fas fa-trash-alt" onClick={handleDelete} /></button>

        </div>
      </div>
    </div>
  </Animated>
</div>
  );
}

export default FormData;
