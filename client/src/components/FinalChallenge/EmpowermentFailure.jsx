import React,{useState,useEffect,useRef,useContext} from "react";
import FailureNote from "./FailureNote";
import AddIcon from "../AddIcon";
import FailureService from "../../Services/FailureService";
import Message from "../Message";//check back if this turns out ok.
import {AuthContext} from "../../Context/AuthContext";
import RqMs from "../RequiredMessage";
import AuthService from "../../Services/AuthService";
import {Link} from "react-router-dom";
import { SpinnerDiamond } from 'spinners-react';

function EmpowermentFailure(){

const authContext=useContext(AuthContext);

const [failNote, setFailNote]=useState({
  title:"",
  positives:"",
  mindset: "",
  fixes:"",
  date:""
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
    date:""
  })
}
}

function deleteNote(id){
  console.log(id);
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

  const block={
    display: "block",
    width: "100%",
    border:"1px solid #ccc",
    borderRadius: "8px"
  }
  return(
    <div className="body-padding">
      <div>
        <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/BadHand">First Challenge</Link>
      </div>
      <div>
        <Link onClick={authCheck} as={Link} to="/Uncommon">Previous Challenge</Link>
      </div>
      <h1 className="all-title">Empowerment of Failure Challenge</h1>
      <ul className="instruction-bullets">
        <li> Write down failures from these challenges</li>
        <li> Write down positives from failures</li>
        <li> Write how to fix failures</li>
        <li> Set date when to tackle those failures</li>
      </ul>
      <div className="all-main-containers">
        <div className="main-contain">


          <label><strong>Challenge:</strong></label>
          {/* //we need a required field here incase it is not added */}
          {clickedAdd && !failNote.title?<RqMs/>:null}
          <input  onChange={handleChange} name="title" value={failNote.title} style={block} type="text" placeholder="Challenge name..."/>

          {clickedAdd && !failNote.positives?<p>*required</p>:null}
          <label><strong>Positives:</strong></label>
          <textarea  onChange={handleChange} name="positives" value={failNote.positives} style={block} type="text" placeholder="Positives here ..."/>

          {clickedAdd && !failNote.mindset?<p>*required</p>:null}
          <label><strong>Mindset:</strong></label>
          <textarea  onChange={handleChange} name="mindset" value={failNote.mindset} style={block} type="text" placeholder="Mindset here ..."/>

          {clickedAdd && !failNote.fixes?<p>*required</p>:null}
          <label><strong>Fixes:</strong></label>
          <textarea  onChange={handleChange} name="fixes" value={failNote.fixes} style={block} type="text" placeholder="Fixes here ..."/>

          {clickedAdd && !failNote.date?<p>*required</p>:null}
          <p style={{display:"inline-block"}}>Fix failures on </p> <input type="date" onChange={handleChange}  name="date" value={failNote.date} />

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

          {message?<Message message={message}/>:null}



          </div>
  );
};

export default EmpowermentFailure;
