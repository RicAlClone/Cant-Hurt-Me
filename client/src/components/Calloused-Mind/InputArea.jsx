import React, {useState} from "react";
import AddIcon from "../AddIcon"

function InputArea(props){

  const [input, setInput ]= useState({
    name:""
  });


  function letsChange(event){
    const newValue= event.target.value;

    setInput({name:newValue});
    console.log('inputing note')
  }

//our words are showing up blank when we hit onclick
  return(
    <div className="input-fix">
      <input name='input' onChange={letsChange} className="list-input" type="text" value={input.name} placeholder="enter list item..."/>
      <button type='submit' className="add-button" onClick={function(e){

        props.addItems(e,input);
        setInput({name:""});
        console.log('clicking to inputing note' ,input);
      }}>
        <AddIcon/>
      </button>

    </div>
  );
}

export default InputArea;
