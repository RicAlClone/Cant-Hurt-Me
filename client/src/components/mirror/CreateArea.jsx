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

  const block={
    display: "block",
    width: "100%",
    border: "none"
  }


// what we Did
  //input bottom margin 10px as well as textarea
  //main-contain bottom padding of 25px to clear touching add button,postion relative
  //bottom-right-add-button position absolute,erase left and bottom,right 40x,bottom -32px

  return(
    <div>
      <form>
        <div className="all-main-containers" style={{marginBottom:'32px'}}>
          <div className="main-contain">

            {clickAdd && !note.title?<BsFillExclamationCircleFill style={{color:"#bf2121"}}/>:null}
            <input className="inputStyle list-input"  onChange={handleChange}  placeholder={props.inputPlaceHolder} type="text" name="title" value={note.title}/>
            {clickAdd && !note.message?<BsFillExclamationCircleFill style={{color:"#bf2121"}}/>:null}
            <textarea rows="4" col="40" onChange={handleChange}  placeholder={props.textAreaPlaceHolder} type="text" name="message" value={note.message}/>
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
