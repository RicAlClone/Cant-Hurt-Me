import React,{useState,useEffect,useContext,useRef} from "react";
import EachNote from "../mirror/EachNote";
import CreateArea from "../mirror/CreateArea";
import {Link} from "react-router-dom";
import UncommonService from '../../Services/UncommonService';
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond } from 'spinners-react';
import Accordion from 'react-bootstrap/Accordion';
import {GiMountainRoad} from 'react-icons/gi';
import { IconContext } from "react-icons";

function Uncommon(){

const [array, setArray]=useState([]);

const [message,setMessage]=useState(null);

const [isLoaded,setIsLoaded]=useState(false);

const authContext=useContext(AuthContext);

let timer=useRef(null);

function authCheck(){
AuthService.isAuthenticated().then(data=>{
  if(!data.isAuthenticated){
    const {setIsAuthenticated,setUser}=authContext;
    setIsAuthenticated(false);
    setUser({username:""})
  }
})
}

const controller = new AbortController();
const signal= controller.signal;
useEffect(()=>{
    UncommonService.get(signal).then(data=>{
    setIsLoaded(true);
    setArray(data.message.documents)
  })
  return ()=>{

    clearTimeout(timer.current)
  }
},[])

function addJournalEntry(entry){


  UncommonService.post(entry).then(data=>{
    if(!data.message.msgError){
      UncommonService.get().then(gData=>{
        setArray(gData.message.documents);
      })
      setMessage(data.message);
      timer.current= setTimeout(()=>{setMessage(null)},2000);
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
    timer.current= setTimeout(()=>{setMessage(null)},2000);
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
      <div className="next-prev-challenge-spacing">
        <Link onClick={()=>{authCheck();controller.abort();}} as={Link} to="/Schedule">Previous Challenge</Link>
        <Link onClick={()=>{authCheck();controller.abort();}} className="first-challenge-link" as={Link} to="/EmpowermentFailure">Next Challenge</Link>
      </div>
      <h1 className="all-title">Uncommon Challenge</h1>
      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <GiMountainRoad size='25px'/>Instructions
          </IconContext.Provider>
        </Accordion.Header>
        <Accordion.Body>
          <p>
            Uncommon amongst uncommon is about being the best, in a group of people that are the uncommon.This challenge is
            geared towards the people who are already successful and have reached the highest
            of goals they created. The people who feel they made it in life. David Goggins explains that some of these
            people feel they lost drive because they reached the top of a mountain and no longer are hungry. These
            individuals have to keep putting more effort everyday and climb new bigger mountains. For the common person
            who are trying to become uncommon, the first step is to find an uncommon person and get to their level. The second
            step is to actually work harder than them. For example if Bruce Lee practiced 1000 kicks a day, then you will
            have to practice 1001 kicks a day.
          </p>
        </Accordion.Body>
      </Accordion>
      <CreateArea
        addNote={addJournalEntry}
        inputPlaceHolder="Enter an Uncommon Person..."
        textAreaPlaceHolder="How did you surpass that person..."
        message={message}
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


      {/* {message?<Message message={message}/>:null} */}



    </div>);
};


export default Uncommon;
