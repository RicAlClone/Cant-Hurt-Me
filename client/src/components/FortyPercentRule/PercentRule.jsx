import React,{useState,useEffect,useContext,useRef} from "react";
import FormData from "./FormData"
import AddIcon from "../AddIcon"
import {Link} from "react-router-dom";
import fps from "../../Services/FortyPercentService";
import {AuthContext} from "../../Context/AuthContext";
import Message from '../Message';
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond } from 'spinners-react';
import {BsFillExclamationCircleFill} from 'react-icons/bs';
import Accordion from 'react-bootstrap/Accordion';
import {FaRunning} from 'react-icons/fa';
import { IconContext } from "react-icons";

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

const [isLoaded,setIsLoaded]=useState(false);

const [required,setRequired]=useState(false);

let authContext=useContext(AuthContext);

function authCheck(){
AuthService.isAuthenticated().then(data=>{
  if(!data.isAuthenticated){
    const {setIsAuthenticated,setUser}=authContext;
    setIsAuthenticated(false);
    setUser({username:""})
  }
})
}

let timer=useRef(null);

useEffect(()=>{
  fps.getRuleNotes().then(data=>{
    setIsLoaded(true);
      setArray(data.fortyPercentRules)
  });

  return ()=>{
     clearTimeout(timer.current);
  }
},[]);

function handleChange(event){
setRequired(false);
  const {name,value}= event.target;

setFormData(function(prevValue){

return{
  ...prevValue,
  [name]:value
}
})

}


function addBaseline(event){
authCheck();
if(!formData.title && !formData.sets && !formData.reps && !formData.hrs && !formData.mins && !formData.sec){
  setRequired(true);
}
else{
  setRequired(false);
  fps.postRuleNote(formData).then(data=>{
    if(!data.message.msgError){
      fps.getRuleNotes().then(getData=>{
        setArray(getData.fortyPercentRules);
        setMessage(data.message);
        timer.current=setTimeout(()=>{setMessage(null)},2000)
      });
    }
    else if(data.message.msgBody === "Unauthorized"){
      authContext.setUser(null);
      authContext.setIsAuthenticated(false);
    }
    else{
    setMessage(data.message);
    timer.current=setTimeout(()=>{setMessage(null)},2000)

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

}

function deleteBaseLine(e,id){


  fps.deleteRuleNote(id).then(data=>{

    if(!data.message.msgError){
      fps.getRuleNotes().then(getData=>{
        setArray(getData.fortyPercentRules)
        setMessage(data.message);
        timer.current=setTimeout(()=>{setMessage(null)},2000)

      })
    }
    else if(data.message.msgBody === "Unauthorized"){
      authContext.setUser(null);
      authContext.setIsAuthenticated(false);
    }
    else{
      setMessage(data.message);
      timer.current=setTimeout(()=>{setMessage(null)},2000)

    }
    });
}

function updateNote(id,toUpdate){
  fps.updateRuleNote(id,toUpdate).then(data=>{
    if(!data.message.msgError){
      fps.getRuleNotes().then(getData=>{
        setArray(getData.fortyPercentRules);
        setMessage(data.message);
        timer.current=setTimeout(()=>{setMessage(null)},2000)

      });
    }
    else if(data.message.msgBody === "Unauthorized"){
      authContext.setUser(null);
      authContext.setIsAuthenticated(false);
    }
    else{
      setMessage(data.message);
      timer.current=setTimeout(()=>{setMessage(null)},2000)

    }
  })
}

  return (
    <div className="body-padding">
      <div className="next-prev-challenge-spacing">
        <Link onClick={authCheck}  as={Link} to="/CookieJar">Previous Challenge</Link>
        <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/Schedule">Next Challenge</Link>
      </div>
      <h1 className="all-title">40 Percent Rule Challenge</h1>
      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <FaRunning size='25px'/>Instructions
          </IconContext.Provider>
        </Accordion.Header>
        <Accordion.Body>
          <p>
            This challenge is to push yourself more than what you think you are capable of. This challenge was born
            when David Goggins ran his first 100 mile marathon. He wanted to quit at mile 40, but continued with agony until he finished.
            That day is when David learned that humans can endure pain past what the mind thinks is capable of.
            A governor in a car is a device is used to measure or regulate the speed of the car. This challenge will help you slowly
            remove that governor from your mind. By incrementing your work load by 5-10% this will train your mind
            and slowly remove that governor without injury or regress.
          </p>
          <ul >
            <li><b>You are at 40% when your brain is telling you to quit.</b></li>
            <li>To help build up your resistance to that little voice telling you to quit. Gradually increase that task by 5-10%.</li>
            <li>Enter the type of task i.e. repititions in pushups, time studying, as a baseline. </li>
            <li>Once a baseline is created you can come back and enter your improvements. </li>
          </ul>
        </Accordion.Body>
      </Accordion>

      <div className="all-main-containers">
        <div className="main-contain" style={{marginBottom:'40px'}}>
          <form className="mirror-form">
            <h2>Baseline</h2>
            <div style={{height:'2rem'}}>
              {message?<Message message={message}/>:null}
              {required?<p style={{marginBottom:'0',color:"#bf2121"}}><BsFillExclamationCircleFill style={{color:"#bf2121"}}/> Must enter at least one field</p>:null}
            </div>
            <label  style={{display:"block",marginBottom:'0'}}>Title</label>
            <input className="inputStyle list-input" onChange={handleChange} name="title" value={formData.title }  type="text" placeholder="I.e. pushups, situps, study/work time"/>

            <label style={{display:"block",marginBottom:'0'}}>Sets</label>
            <input type="number" pattern="\d*" min="0" className="inputStyle" onChange={handleChange} name="sets" value={formData.sets} />


            <label style={{display:"block",marginBottom:'0'}}>Reps</label>
            <input type="number" pattern="\d*" min="0" className="inputStyle" onChange={handleChange} name="reps" value={formData.reps}  />


            <label style={{display:"block",marginBottom:'0'}}>Time</label>
            <input className="inputStyle" onChange={handleChange} name="hrs" value={formData.hrs } type="number" pattern="\d*" placeholder="hrs" min="0" style={{width:"28%"}}/>
            <input className="inputStyle" onChange={handleChange} name="mins" value={formData.mins } type="number" pattern="\d*" placeholder="min" min="0" max="60" style={{width:"28%"}}/>
            <input className="inputStyle" onChange={handleChange} name="sec" value={formData.sec} type="number" pattern="\d*" placeholder="sec" min="0" max="60" style={{width:"28%"}}/>

          </form>

          <div onClick={addBaseline} style={{display:"block"}} className="bottom-right-add-button">
            <AddIcon/>
          </div>
        </div>
      </div>

      {
        isLoaded?
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
                  authCheck={authCheck}
                       />
              })

            }
          </div>
        :
        <div className="all-main-containers">
          <SpinnerDiamond size="150px"/>
        </div>
      }

    </div>
);
};

export default PercentRule;
