import React,{useState} from "react";
import AddIcon from "../AddIcon";
import Message from "../Message";
import {BsFillExclamationCircleFill} from "react-icons/bs"

function CreateArea(props){

  const [note, setNote]= useState({
    title:"",
    message:""
  });

const [clickAdd,setClickAdd]=useState(false);

  function handleChange(event){

const {name, value}=event.target;

  setNote(function(prevValue){

return{
  ...prevValue,
  [name]:value
}
  });
  }

function onSubmit(event){
event.preventDefault();
setClickAdd(true);
  if(!note.title||!note.message){
    console.log('not all form questions where complete');
  }
  else{
    props.addNote(note)
    setClickAdd(false);
    setNote({
      title:"",
      message:""
    })
  }
};


function inputErrorCatcher(x){
  if(clickAdd && !note[x]){
    return {backgroundColor:"#ffdede"}
  }
  else{
    return null;
  }
}

  return(
    <div>
      <form>
        <div className="all-main-containers" style={{marginBottom:'32px'}}>
          <div className="main-contain">

            <div style={{height:'25px'}}>
              {clickAdd && !note.title?<BsFillExclamationCircleFill style={{color:"#bf2121"}}/>:null}
            </div>
            <input style={inputErrorCatcher('title')} className="inputStyle list-input"  onChange={handleChange}  placeholder={props.inputPlaceHolder} type="text" name="title" value={note.title}/>
            <div style={{height:'25px'}}>
              {clickAdd && !note.message?<BsFillExclamationCircleFill style={{color:"#bf2121"}}/>:null}
            </div>
            <textarea style={inputErrorCatcher('message')} rows="4" col="40" onChange={handleChange}  placeholder={props.textAreaPlaceHolder} type="text" name="message" value={note.message}/>
            <div style={{height:"40px"}}>
              {props.message?
                <Message message={props.message}/>
              : null
              }
            </div>

            <button type='submit' className="bottom-right-add-button"  onClick={onSubmit}>
              <AddIcon/>
            </button>

          </div>

        </div>
      </form>
    </div>
      );
};

export default CreateArea;
