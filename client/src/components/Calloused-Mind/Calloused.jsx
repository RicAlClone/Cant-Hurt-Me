import React,{useState,useEffect,useContext,useRef} from "react";
import InputArea from "./InputArea";
import ListItem from "../hand/ListItem";
import {Link} from "react-router-dom";
import CallousedService from "../../Services/CallousedService";
import {AuthContext} from "../../Context/AuthContext";
import Message from '../Message';

const Calloused= function(props){
  //
  const authContext= useContext(AuthContext);

const [items, setItems]= useState([]);
const [message,setMessage]=useState(null);

let timer=useRef(null);

useEffect(()=>{
CallousedService.getCallousedNotes().then(data=>{
  console.log(data);
  setItems(data.calluses);
});
return ()=>{
  clearTimeout(timer);
}
},[]);

  function addItems(e,input){

  e.preventDefault();
  console.log('recieving input ',input);
  CallousedService.postCallousedNote(input).then(data=>{
if(!data.message.msgError){
    CallousedService.getCallousedNotes().then(getData=>{
      setItems(getData.calluses);
      setMessage(data.message);
          timer = setTimeout(()=>setMessage(null),2000);
    });


  }
  if(data.message.msgBody === "Unauthorized"){
  authContext.setUser({username:""});
  authContext.setIsAuthenticated(false);
  }else{
    setMessage(data.message);
    timer = setTimeout(()=>setMessage(null),2000);
  }

})
}

  function deleteItem(id){

    CallousedService.deleteCallusNote(id).then(getData=>{
      console.log(getData)//we get the data now what? we get back the new notes with getCallousedNotes
      if(!getData.message.msgError){
        CallousedService.getCallousedNotes().then(data=>{
          setItems(data.calluses);
          setMessage(getData.message);
          timer=setTimeout(()=>setMessage(null),2000);
        });

      }
      else if(getData.message.msgBody === "Unauthorized"){
        authContext.setUser({username:""});
        authContext.setIsAuthenticated(false);
      }
      else{
        setMessage(getData.message);
        timer=setTimeout(()=>setMessage(null),2000);
      }
    });
  }

  return(
    <div className="body-padding">
      <h1 className="all-title">Calloused Mind Challenge</h1>
      <ul className="instruction-bullets">
        <li>Make a list of the things you hate to do.</li>
        <li>Enter small things that are tedious and do them. The more you can get done the more calloused your mind becomes.</li>
      </ul>
      <form>
        <div className="all-main-containers">
          <div className="inner-container">
            <h1 className="list-title">I hate too</h1>
            <InputArea
              addItems={addItems}
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
      
      {message?
        <Message
          message={message}
        />
      :null}
      <div>
        <Link className="first-challenge-link" as={Link} to="/TakingSouls">Next Challenge</Link>
      </div>
    </div>
  );
};

export default Calloused;
