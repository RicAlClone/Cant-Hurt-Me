import React,{useState} from "react";
import FailureNote from "./FailureNote";
import AddIcon from "../AddIcon";
//we want to add a form that creates seperate notes
// in the note we want to have a Title
//Note on failures
//note what

function EmpowermentFailure(){

const [obj, setObj]=useState({
  note:"",
  date:"",
});

const [array,setArray]=useState([]);

function handleChange(event){
  const {name, value}=event.target;

  setObj(function(prev){
    return{
      ...prev,
      [name]: value
    }
  })
}

function addNote(){
setArray(function(prev){
  return [...prev, obj]
})
setObj({
  note:"",
  date:"",
})
}


function deleteNote(id){
setArray(function(prev){
  return prev.filter(function(elem,index){
    return index !== id;
  })
})

}

  const block={
    display: "block",
    width: "100%",
    border: "none"
  }
  return(
    <div className="body-padding">
      <h1 className="all-title">Empowerment of Failure Challenge</h1>
      <ul className="instruction-bullets">
        <li> Write down failures from these challenges</li>
        <li> Write down positives from failures</li>
        <li> Write how to fix failures</li>
        <li> Set date when to tackle those failures</li>
      </ul>
      <div className="all-main-containers">
        <div className="main-contain">

          <textarea onChange={handleChange} name="note" value={obj.note} style={block} type="text" placeholder="Notes here ..."/>
          <p style={{display:"inline-block"}}>Fix failures on </p> <input type="date" onChange={handleChange}  name="date" value={obj.date} />

          <div onClick={addNote} className="bottom-right-add-button">
            <AddIcon/>
          </div>
        </div>
      </div>

      <div className="row">
        {array.map(function(item,index){
          return <FailureNote
            key={index}
            delete={deleteNote}
            id={index}
            item={item}
            index={index}
                 />
        })}
      </div>

    </div>
  );
};

export default EmpowermentFailure;
