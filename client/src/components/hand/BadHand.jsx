import React,{useState,useEffect,useRef, useContext} from "react";
import ListItem from "./ListItem";
import {Link} from "react-router-dom";
import BadhandService from "../../Services/BadhandService.js";
import AddIcon from "../AddIcon";
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";


const BadHand= function(){
//mayble we can destruct AuthContext below
//we can check if isAuthenticated is false then send us back to login.
const authContext=useContext(AuthContext);

const[items, newItems]= useState([]);

const [input, setInput ]= useState({
  name:""
});
const [message, setMessage]=useState(null);

let timerID=useRef(null);

useEffect(()=>{
  BadhandService.getBadhands().then(data=>{
    console.log(data);
    console.log(data.badhands);
    newItems(data.badhands);
  });
return ()=>{
  clearTimeout(timerID);
}

},[]);

function letsChange(event){
  const newValue= event.target.value;
  setInput({name:newValue});
}

//whats happening is right after adding we want to delete but it wont.
//i need to getTodos when we create a new todo and when we delete a todo
function addItems(e){
e.preventDefault();
  BadhandService.postBadhand(input).then((data)=>{

    if(!data.message.msgError){

      BadhandService.getBadhands().then(data=>{
        newItems(data.badhands);
      });

        setMessage(data.message);
        timerID = setTimeout(() => {
          setMessage(null);
      }, 2000)


      setInput({name:""});
        //this would probably be else if(!isAuthenticated)
    } else if(data.message.msgBody === "Unauthorized"){

      setMessage(data.message);
      authContext.setUser({username:""});
      authContext.setIsAuthenticated(false);

    }
    else{
      setMessage(data.message);
      timerID = setTimeout(() => {
        setMessage(null);
    }, 2000);
    }

  })
}


function deleteItem(id){

BadhandService.deleteBadhand(id).then(data=>{
  //if error is false get back all badhands
  if(!data.message.msgError){
    BadhandService.getBadhands().then(data=>{
      newItems(data.badhands);
      setMessage(data.message);
      timerID = setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  } //else if msgbody is unauthorized lets
else if (data.message.msgBody === "Unauthorized"){
  //we want to return a messsage.also  log us out.
  setMessage(data.message);
  authContext.setUser({username:""});
  authContext.setIsAuthenticated(false);
}
else{
  //we want to return a message and timer?
  setMessage(message);
  timerID = setTimeout(() => {
    setMessage(null);
  }, 2000);
}
})
}

const buttonStyle={
  border:"none",
  backgroundColor:"white"
}

  return(
    <div className="body-padding">
      <h1 className="all-title">Bad Hand Challenge</h1>
      <ul className="instruction-bullets">
        <li>Make a list of the bad cards that life has dealt you in the past and present.</li>
      </ul>
      <form>
        <div className="all-main-containers">
          <div className="inner-container">

            <div className="input-fix">
              <input  name='input' onChange={letsChange} className="list-input" type="text" value={input.name} placeholder="enter list item..."/>
              <button type='submit' style={buttonStyle} onClick={addItems}>
                <AddIcon/>
              </button>

            </div>


            <div>
              <ul className="list-container">

                {items.map(function(arrayItem,index){ //since items becomes newItems for every element we place it in a <li>

                  return <ListItem //i was missing return which gave me a bug

                    key={index}
                    id={arrayItem._id}
                    arrayItem={arrayItem}
                    deleteItem={deleteItem}
                         />
                })}

              </ul>
            </div>
          </div>

        </div>
      </form>
      {message? <Message message={message}/>:null}
      <div>
        <Link className="first-challenge-link" as={Link} to="/mirror">Next Challenge</Link>
      </div>
    </div>

  );
};

export default BadHand;
