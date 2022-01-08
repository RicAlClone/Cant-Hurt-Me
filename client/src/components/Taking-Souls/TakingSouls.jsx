import React,{useState,useEffect,useContext,useRef} from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import {Link} from "react-router-dom";
import tsService from "../../Services/TakingSoulsService";
import {AuthContext} from "../../Context/AuthContext";
import Message from "../Message";


const TakingSouls= function(props){


const [array, setArray]=useState([]);
const [message,setMessage]=useState(null);
//how are we going to use authContext
const authContext=useContext(AuthContext);

let timer= useRef(null);

useEffect(()=>{
  tsService.getTSNotes().then(data=>{
    console.log('this is our data ',data);
    setArray(data.takingSouls)
  });
  return ()=>{clearTimeout(timer)};
},[]);

function addJournalEntry(entry){

tsService.addTSNote(entry).then(data=>{

  if(!data.message.msgError){

  tsService.getTSNotes().then(getData=>{
    setArray(getData.takingSouls);
    setMessage(data.message);
    timer= setTimeout(function(){ setMessage(null);}, 2000);
    });

}else if(data.message.msgBody === "Unauthorized"){

    authContext.setIsAuthenticated(false);
    authContext.setUser({username:""});

}else{

setMessage(data.message);
timer= setTimeout(function(){ setMessage(null);}, 2000);
}

});

};

function deleteJournalEntry(id){

tsService.deleteTSNote(id).then(data=>{
  if(!data.message.msgError){
    tsService.getTSNotes().then(getData=>{
      setArray(getData.takingSouls);
      setMessage(data.message);
      timer=setTimeout(()=>setMessage(null), 2000);
    });
  }else if(data.message.msgBody === "Unauthorized"){
    authContext.setIsAuthenticated(false);
    authContext.setUser({username:""});
    // props.history.push('/login')
  }else{
    setMessage(data.message);
    timer= setTimeout(function(){ setMessage(null);}, 2000);
  }

});

};

  return(
    <div className="body-padding">

      <h1 className="all-title">Taking Souls Challenge</h1>
      <ul className="instruction-bullets">
        <li>Document everytime you outwork anyone in any situation.
        In example check out the hardest worker in the room and work harder.</li>
        <li>Earn peoples respect by going beyond what they set as an example or ask you to complete.</li>
      </ul>

      <CreateNote
        addJournalEntry={addJournalEntry}

      />

      <div className="row">
        {array.map(function(arrayItem, index){
          return <Note
            key={index}
            id={arrayItem._id}
            calendar={arrayItem.date}
            title={arrayItem.title}
            paragraph={arrayItem.paragraph}
            deleteJournalEntry= {deleteJournalEntry}

                 />
        })}

      </div>
      {message? <Message message={message}/>:null}
      <div>
        <Link className="first-challenge-link" as={Link} to="/ArmoredMind">Next Challenge</Link>
      </div>
    </div>
  );
};

export default TakingSouls;
