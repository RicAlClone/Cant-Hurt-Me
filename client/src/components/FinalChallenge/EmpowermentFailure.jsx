import React,{useState,useEffect,useRef,useContext} from "react";
import FailureNote from "./FailureNote";
import AddIcon from "../AddIcon";
import FailureService from "../../Services/FailureService";
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import {Link} from "react-router-dom";
import { SpinnerDiamond } from 'spinners-react';
import {BsFillExclamationCircleFill} from 'react-icons/bs';
import Accordion from 'react-bootstrap/Accordion';
import {GrDocumentTime} from 'react-icons/gr';
import { IconContext } from "react-icons";

function EmpowermentFailure(){

const authContext=useContext(AuthContext);

const [failNote, setFailNote]=useState({
  title:"",
  positives:"",
  mindset: "",
  fixes:"",
  date:new Date().toISOString().slice(0,10)
});

const [array,setArray]=useState([]);

const [message,setMessage]=useState(null);

const [isLoaded,setIsLoaded]=useState(false);

let timerID=useRef(null);

function authCheck(){
AuthService.isAuthenticated().then(data=>{
  if(!data.isAuthenticated){
    const {setIsAuthenticated,setUser}=authContext;
    setIsAuthenticated(false);
    setUser({username:""})
  }
})
}

useEffect(()=>{
  FailureService.get().then(data=>{
    setIsLoaded(true);
    setArray(data.message.documents);
  })

  return ()=>{
    clearTimeout(timerID);
  }
},[])

function handleChange(event){
  const {name, value}=event.target;

  setFailNote(function(prev){
    return{
      ...prev,
      [name]: value
    }
  })
}

const [clickedAdd,setClickedAdd]=useState(false);

function addNote(){
setClickedAdd(true);
//once true.Check if failNote.title is false,if its false the set required message.
if(!failNote.title || !failNote.positives||!failNote.mindset||!failNote.fixes||!failNote.date){
  console.log('not all form field were complete');
}
else{
  setClickedAdd(false);

  FailureService.post(failNote).then(data=>{
    if(!data.message.msgError){
      FailureService.get().then(gData=>{
        setArray(gData.message.documents);
      })
      setMessage(data.message);
      timerID=setTimeout(()=>{setMessage(null)},2000)
    }
    else if(data.message.msgBody==="Unauthorized"){
      const {setIsAuthenticated,setUser}= authContext;
      setIsAuthenticated(false);
      setUser(null);
    }
  })

  setFailNote({
    title:"",
    positives:"",
    mindset:"",
    fixes:"",
    date:new Date().toISOString().slice(0,10)
  })
}
}

function deleteNote(id){
FailureService.delete(id).then(data=>{
  if(!data.message.msgError){
    FailureService.get().then(gData=>{
      setArray(gData.message.documents);
    })
    setMessage(data.message);
    timerID=setTimeout(()=>{setMessage(null)},2000)
  }
  else if(data.message.msgBody==="Unauthorized"){
    const {setIsAuthenticated,setUser}= authContext;
    setIsAuthenticated(false);
    setUser(null);
  }
})

}


  function emptyInputError(x){
    if(clickedAdd &&!failNote[x]){
      return {
        backgroundColor:"#ffdede",
        display: "block",
        width: "100%",
        border:"1px solid #ccc",
        borderRadius: "8px"
    }
    }
    else{
      return {
        display: "block",
        width: "100%",
        border:"1px solid #ccc",
        borderRadius: "8px"
      }
    }
  }
function dateEmptyCheck(){
  if(clickedAdd && !failNote.date){
    return {width:'60%',backgroundColor:"#ffdede"}
  }
  else{
    return {width:'60%',backgroundColor:"white"};
  }
}
  return(
    <div className="body-padding">
      <div className="next-prev-challenge-spacing">
        <Link onClick={authCheck} as={Link} to="/Uncommon">Previous Challenge</Link>
        <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/BadHand">First Challenge</Link>
      </div>
      <h1 className="all-title">Empowerment of Failure Challenge</h1>
      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <GrDocumentTime size='25px'/>Instructions
          </IconContext.Provider>
        </Accordion.Header>
        <Accordion.Body>
          <p>
            Note all the failures you had with these challenges. Note the positives from these failures. Note your
            mind set during your failing and how that made you feel. Note how you can tackle these failures again
            and schedule it. If you keep failing dont give up and keep attacking until you reach the goal.
          </p>
        </Accordion.Body>
      </Accordion>

      <div className="all-main-containers">
        <div className="main-contain" style={{height:'500px',display:'flex',flexDirection:'column',justifyContent:'space-evenly',marginBottom:'30px'}}>
          <div>
            <label><b>Challenge:</b> {clickedAdd && !failNote.title?<BsFillExclamationCircleFill style={{color:"#bf2121",margin:'0 10px'}}/>:null}</label>
            <input onChange={handleChange} name="title" value={failNote.title} style={emptyInputError('title')} type="text" placeholder="Challenge name..."/>
          </div>

          <div>
            <label><b>Positives:</b>{clickedAdd && !failNote.title?<BsFillExclamationCircleFill style={{color:"#bf2121",margin:"0 10px"}}/>:null}</label>
            <textarea  onChange={handleChange} name="positives" value={failNote.positives} style={emptyInputError('positives')} type="text"
            placeholder="Positives that came out of this attempt..."/>
          </div>

          <div>
            <label><b>Mindset:</b>{clickedAdd && !failNote.title?<BsFillExclamationCircleFill style={{color:"#bf2121",margin:"0 10px"}}/>:null}</label>
            <textarea  onChange={handleChange} name="mindset" value={failNote.mindset} style={emptyInputError('mindset')} type="text"
            placeholder="What was your mindset while or when you failed..."/>
          </div>

          <div>
            <label><b>Fixes:</b>{clickedAdd && !failNote.title?<BsFillExclamationCircleFill style={{color:"#bf2121",margin:"0 10px"}}/>:null}</label>
            <textarea  onChange={handleChange} name="fixes" value={failNote.fixes} style={emptyInputError('fixes')} type="text"
            placeholder="What adjustments can we make on our next attempt..."/>
          </div>

          {/* took off className:'inputStyle' */}
          {/* style={{display:"inline-block"}} */}
          {/* date-input */}
          <div>
            <label style={{display:'block'}}><b>Fix Date:</b></label>
            <input type="date"  style={dateEmptyCheck()} className='inputStyle ' onChange={handleChange}  name="date" value={failNote.date}/>
            {clickedAdd && !failNote.date?<BsFillExclamationCircleFill style={{color:"#bf2121",margin:"0 10px"}}/>:null}
          </div>

          <div style={{height:"40px"}}>
            {message?
              <Message message={message}/>
            : null
            }
          </div>

          <div onClick={addNote} className="bottom-right-add-button">
            <AddIcon/>
          </div>
        </div>
      </div>

      {
        isLoaded?
          <div className="row">
            {array.map(function(item,index){
              return <FailureNote
                key={item._id}
                id={item._id}
                delete={deleteNote}
                item={item}
                     />
            })}
          </div>
        :
        <div className="all-main-containers">
          <SpinnerDiamond size="150px"/>
        </div>
      }

      {/* {message?<Message message={message}/>:null} */}



          </div>
  );
};

export default EmpowermentFailure;
