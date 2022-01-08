import React,{useState,useEffect,useContext,useRef} from "react";
import FormData from "./FormData"
import AddIcon from "../AddIcon"
import {Link} from "react-router-dom";
import fps from "../../Services/FortyPercentService";
import {AuthContext} from "../../Context/AuthContext";
import Message from '../Message';



const PercentRule = function() {

const[formData, setFormData]=useState({
title:"",
sets:"",
reps:"",
hrs:"",
mins:"",
sec:""
});

const[message, setMessage]=useState(null);


const[array,setArray]=useState([]);

let authContext=useContext(AuthContext);


let timer=useRef(null);

useEffect(()=>{
  fps.getRuleNotes().then(data=>{
    console.log(data.fortyPercentRules);
      setArray(data.fortyPercentRules)
  });

  return ()=>{
     clearTimeout(timer);
  }
},[]);

function handleChange(event){

  const {name,value}= event.target;

setFormData(function(prevValue){

return{
  ...prevValue,
  [name]:value
}
})
}



function addBaseline(event){

fps.postRuleNote(formData).then(data=>{
  if(!data.message.msgError){
    fps.getRuleNotes().then(getData=>{
      console.log(getData);
      setArray(getData.fortyPercentRules);
      setMessage(data.message);
      timer=setTimeout(()=>{setMessage(null)},2000)
    });
  }
  else if(data.message.msgBody === "Unauthorized"){
    authContext.setUser(null);
    authContext.setIsAuthenticated(false);
  }
  else{
  setMessage(data.message);
  timer=setTimeout(()=>{setMessage(null)},2000)

  }
});


setFormData({
  title:"",
  sets:"",
  reps:"",
  hrs:"",
  mins:"",
  sec:""
})

  event.preventDefault();
}

function deleteBaseLine(e,id){


  fps.deleteRuleNote(id).then(data=>{

    if(!data.message.msgError){
      fps.getRuleNotes().then(getData=>{
        console.log(getData,' on line 86');
        setArray(getData.fortyPercentRules)
        setMessage(data.message);
        timer=setTimeout(()=>{setMessage(null)},2000)

      })
    }
    else if(data.message.msgBody === "Unauthorized"){
      authContext.setUser(null);
      authContext.setIsAuthenticated(false);
    }
    else{
      setMessage(data.message);
      timer=setTimeout(()=>{setMessage(null)},2000)

    }
    });
}

function updateNote(id,toUpdate){
  fps.updateRuleNote(id,toUpdate).then(data=>{
    if(!data.message.msgError){
      fps.getRuleNotes().then(getData=>{
        setArray(getData.fortyPercentRules);
        console.log(getData)
        setMessage(data.message);
        timer=setTimeout(()=>{setMessage(null)},2000)

      });
    }
    else if(data.message.msgBody === "Unauthorized"){
      authContext.setUser(null);
      authContext.setIsAuthenticated(false);
    }
    else{
      setMessage(data.message);
      timer=setTimeout(()=>{setMessage(null)},2000)

    }
  })
}

console.log(array);
  return (
    <div className="body-padding">
      <h1 className="all-title">40 Percent Rule Challenge</h1>
      <ul className="instruction-bullets">
        <li><b>You are at 40% when your brain is telling you to quit.</b></li>
        <li>To help build up your resistance to that little voice telling you to quit. Gradually increase that task by 5-10%.</li>
        <li>Enter the type of task i.e. repititions in pushups, time studying, as a baseline. </li>
        <li>Once a baseline is created you can come back and enter your improvements. </li>
      </ul>
      <div className="all-main-containers">
        <div className="main-contain">
          <form className="mirror-form">
            <h2>Baseline</h2>
            <label  style={{display:"block"}}>Title</label>
            <input onChange={handleChange} name="title" value={formData.title } style={{width:"100%"}} type="text" placeholder="I.e. pushups, situps, study/work time"/>
            <label style={{display:"block"}}>Sets</label>
            <input onChange={handleChange} name="sets" value={formData.sets} type="number" min="0"/>
            <label style={{display:"block"}}>Reps</label>
            <input onChange={handleChange} name="reps" value={formData.reps} type="number" min="0" />
            <label style={{display:"block"}}>Time</label>
            <input onChange={handleChange} name="hrs" value={formData.hrs } type="number" placeholder="hrs" min="0" style={{width:"15%"}}/>
            <input onChange={handleChange} name="mins" value={formData.mins } type="number" placeholder="min" min="0" max="60" style={{width:"15%"}}/>
            <input onChange={handleChange} name="sec" value={formData.sec} type="number" placeholder="sec" min="0" max="60" style={{width:"15%"}}/>

          </form>

          <div onClick={addBaseline} style={{display:"block"}} className="bottom-right-add-button">
            <AddIcon/>
          </div>
        </div>
      </div>

      <div className="row">
        {
          array.map(function(element,index){
            //we are looping over our array which contains
            //data
            return <FormData
              key={element._id}
              id={element._id}
              index={index}
              title={element.title}
              reps={element.reps}
              sets={element.sets}
              hrs={element.hrs}
              mins={element.mins}
              sec={element.sec}
              delete={deleteBaseLine}
              updateNote={updateNote}
                   />
          })

        }
      </div>

      {
        message?<Message message={message}/>:null
      }

      <div>
        <Link className="first-challenge-link" as={Link} to="/Schedule">Next Challenge</Link>      </div>
    </div>
);
};

export default PercentRule;
