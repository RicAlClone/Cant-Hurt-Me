import React,{useState,useEffect,useContext,useRef} from "react";
import EachNote from "../mirror/EachNote";
import CreateArea from "../mirror/CreateArea";
import {Link} from "react-router-dom";
import UncommonService from '../../Services/UncommonService';
import {AuthContext} from "../../Context/AuthContext";
import Message from "../Message";
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond } from 'spinners-react';


function Uncommon(){

const [array, setArray]=useState([]);

const [message,setMessage]=useState(null);

const [isLoaded,setIsLoaded]=useState(false);

const authContext=useContext(AuthContext);

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
  UncommonService.get().then(data=>{
    setIsLoaded(true);
    setArray(data.message.documents)
  })
  return ()=>{clearTimeout(timerID)}
},[])

function addJournalEntry(entry){


  //we want to send entry to our /post
  UncommonService.post(entry).then(data=>{
    if(!data.message.msgError){
      UncommonService.get().then(gData=>{
        setArray(gData.message.documents);
      })
      setMessage(data.message);
      timerID= setTimeout(()=>{setMessage(null)},2000);
    }
    else if(data.message.msgBody==="Unauthorized"){
      const {setUser,setIsAuthenticated}=authContext;
      setUser(null);
      setIsAuthenticated(false);
    }
  })
}

function deleteJournalEntry(id){
UncommonService.delete(id).then(data=>{
  if(!data.message.msgError){
    UncommonService.get().then(gData=>{
      setArray(gData.message.documents);
    })
    setMessage(data.message);
    timerID= setTimeout(()=>{setMessage(null)},2000);
  }
  else if(data.message.msgBody==="Unauthorized"){
    const {setUser,setIsAuthenticated}=authContext;
    setUser(null);
    setIsAuthenticated(false);
  }
})
}

  return(
    <div className="body-padding">
      <div>
        <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/EmpowermentFailure">Next Challenge</Link>
      </div>
      <div>
        <Link onClick={authCheck} as={Link} to="/Schedule">Previous Challenge</Link>
      </div>
      <h1 className="all-title">Uncommon Challenge</h1>
      <ul className="instruction-bullets">
        <li>Find an uncommon person that you aspire to be, either they be in your life,or someone you heard about.
          Look at what makes them stand out and why they are the best at what they do. If you want to be an uncommon person
          amongst uncommon people.You will have to work harder than them. For example, if Bruce Lee practiced throwing 1000 kicks a day,
          then you have to practice more than 1000 kicks a day.
        </li>
        <li>Note those times and how you accomplished this challenge.</li>
      </ul>

      {/* addJournal entry is used to trigger addJournalEntry with the body we want sent */}
      <CreateArea
        addNote={addJournalEntry}
        inputPlaceHolder="Enter an Uncommon Person..."
        textAreaPlaceHolder="How did you surpass that person..."
      />
      {
        isLoaded?
          <div className="row">
            {array.map(function(arrayItem, index){
              return <EachNote
                key={arrayItem._id}
                id={arrayItem._id}
                title={arrayItem.title}
                message={arrayItem.message}
                deleteNote= {deleteJournalEntry}
                     />
            })}

          </div>
        :
        <div className="all-main-containers">
          <SpinnerDiamond size="150px"/>
        </div>
      }


      {message?<Message message={message}/>:null}



    </div>);
};


export default Uncommon;
