import React,{useState} from "react";
import AddIcon from "../AddIcon";


function CreateArea(props){

  const [note, setNote]= useState({
    title:"",
    message:""
  });

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
  props.addNote(note)
  setNote({
    title:"",
    message:""
  })
};

  const block={
    display: "block",
    width: "100%",
    border: "none"
  }

  return(
    <div>
      <form>
        <div className="all-main-containers">
          <div className="main-contain">


            <input onChange={handleChange} style={block} placeholder="Title" type="text" name="title" value={note.title}/>
            <textarea onChange={handleChange} style={block} placeholder="Your Note" type="text" name="message" value={note.message}/>
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
