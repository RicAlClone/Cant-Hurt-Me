import React, {useState} from "react";
import AddIcon from "../AddIcon"
import {BsFillExclamationCircleFill} from "react-icons/bs"
import Message from '../Message';


function InputArea(props){

  const [input, setInput ]= useState({
    name:""
  });

const [required,setRequired]=useState(false);

  function letsChange(event){
    const newValue= event.target.value;

    setInput({name:newValue});
    console.log('inputing note')
  }

console.log("props.message:",props.message);
//our words are showing up blank when we hit onclick
  return(
    <>
      <div style={{height:"50px",textIndent:"20px",margin:"0",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",


      }}>
        {required && !input.name?
          <p style={{color:"#bf2121",marginBottom:"0"}}>Empty <BsFillExclamationCircleFill style={{color:"#bf2121"}}/></p>
        :
          props.message?
            <div style={{display:"flex",justifyContent:"center"}}>
              <Message
                message={props.message}
              />
            </div>
          :null
        }
      </div>
      <div className="input-fix" style={{height:"55px"}}>
        <input autocomplete="off" name='input' onChange={letsChange} className="inputStyle list-input" type="text" value={input.name} placeholder="I hate to..."/>
        <button type='submit' style={{border:"none",backgroundColor:"white"}} onClick={function(e){
          e.preventDefault();
          setRequired(true);
          if(!input.name){
            console.log('input was not filled');
          }
          else{
            setRequired(false);
            props.addItems(e,input);
            setInput({name:""});
            console.log('clicking to inputing note' ,input);
          }

        }}>
          <AddIcon/>
        </button>

      </div>
    </>
      );
}

export default InputArea;
