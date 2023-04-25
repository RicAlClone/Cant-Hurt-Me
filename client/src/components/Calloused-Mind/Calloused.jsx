import React,{useState,useEffect,useContext,useRef} from "react";
import InputArea from "./InputArea";
import ListItem from "../hand/ListItem";
import {Link} from "react-router-dom";
import CallousedService from "../../Services/CallousedService";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond } from 'spinners-react';
import Accordion from 'react-bootstrap/Accordion';
import {GiBrain} from 'react-icons/gi';
import { IconContext } from "react-icons";


const Calloused= function(props){
  const authContext= useContext(AuthContext);

const [items, setItems]= useState([]);
const [message,setMessage]=useState(null);
const [isLoaded,setIsLoaded]=useState(false);
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

useEffect(()=>{
  window.scrollTo(0,0);
CallousedService.getCallousedNotes().then(data=>{
  setIsLoaded(true);
  setItems(data.calluses);
});
return ()=>{
  clearTimeout(timer.current);
}
},[]);

  function addItems(e,input){

  e.preventDefault();
  CallousedService.postCallousedNote(input).then(data=>{
if(!data.message.msgError){
    CallousedService.getCallousedNotes().then(getData=>{
      setItems(getData.calluses);
      setMessage(data.message);
          timer.current = setTimeout(()=>setMessage(null),2000);
    });


  }
  if(data.message.msgBody === "Unauthorized"){
  authContext.setUser({username:""});
  authContext.setIsAuthenticated(false);
  }else{
    setMessage(data.message);
    timer.current = setTimeout(()=>setMessage(null),2000);
  }

})
}

  function deleteItem(id){

    CallousedService.deleteCallusNote(id).then(getData=>{
      if(!getData.message.msgError){
        CallousedService.getCallousedNotes().then(data=>{
          setItems(data.calluses);
          setMessage(getData.message);
          timer.current=setTimeout(()=>setMessage(null),2000);
        });

      }
      else if(getData.message.msgBody === "Unauthorized"){
        authContext.setUser({username:""});
        authContext.setIsAuthenticated(false);
      }
      else{
        setMessage(getData.message);
        timer.current=setTimeout(()=>setMessage(null),2000);
      }
    });
  }

  return(
    <div className="body-padding">
      <div className="next-prev-challenge-spacing">
        <Link onClick={authCheck} as={Link} to="/Mirror">Previous Challenge</Link>
        <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/TakingSouls">Next Challenge</Link>
      </div>

      <h1 className="all-title">Calloused Mind Challenge</h1>
      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <GiBrain size='25px'/>Instructions
          </IconContext.Provider>
        </Accordion.Header>
        <Accordion.Body>
          <p>  This challenge is intended to toughen and build a callus over your mind. To do this we must get out
            of our comfort zone and do things everyday that we dont want to do,that will improve your life. Even if
            its as simple as making your bed, or washing your dishes. The key to this is doing it every day. Once this
            becomes normal and comfortable,its time to add more. For example if running 1 mile everyday becomes comfortable,
          increase it by 1.5 miles everyday.The goal is to keep callousing the mind.</p>
        </Accordion.Body>
      </Accordion>

      {
        isLoaded?
          <form>
            <div className="all-main-containers">
              <div className="inner-container" style={{position:'relative'}}>
                <InputArea
                  addItems={addItems}
                  message={message}
                />

                <ul>
                  {items.map(function(arrayItem,index){
                    return  <ListItem
                      key={index}
                      id={arrayItem._id}
                      arrayItem={arrayItem}
                      deleteItem={deleteItem}

                            />
                  })}
                </ul>

              </div>
            </div>
          </form>
        :
        <div className="all-main-containers">
          <SpinnerDiamond size="150px"/>
        </div>
      }

    </div>
  );
};

export default Calloused;
