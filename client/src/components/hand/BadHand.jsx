import React,{useState,useEffect,useRef, useContext} from "react";
import ListItem from "./ListItem";
import {Link} from "react-router-dom";
import BadhandService from "../../Services/BadhandService.js";
import AddIcon from "../AddIcon";
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond } from 'spinners-react';
import {Alert} from 'react-bootstrap';


const BadHand= function(){

//mayble we can destruct AuthContext below
//we can check if isAuthenticated is false then send us back to login.
const authContext=useContext(AuthContext);

function authCheck(){
AuthService.isAuthenticated().then(data=>{
  if(!data.isAuthenticated){
    const {setIsAuthenticated,setUser}=authContext;
    setIsAuthenticated(false);
    setUser({username:""})
  }
})
}

const[items, newItems]= useState([]);

const [input, setInput ]= useState({
  name:""
});
const [message, setMessage]=useState(null);

//useRef will remember past if its greater than 0.
console.log('items.length:',items.length);

let timerID=useRef(null);

const [isLoaded,setIsLoaded]=useState(false);


useEffect(()=>{
  window.scrollTo(0,0);
  BadhandService.getBadhands().then(data=>{
    setIsLoaded(true);
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

  if(!data.message.msgError){

BadhandService.getBadhands().then(data => {
  newItems(data.badhands);
});
setMessage(data.message);
timerID = setTimeout(() => {
  setMessage(null);
}, 2000);
} //else if msgbody is unauthorized lets
else if (data.message.msgBody === "Unauthorized"){

  //we want to return a messsage.also  log us out.
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



  return(
    <div className="body-padding">
      <div className="next-prev-challenge-spacing">
        <Link onClick={authCheck}  as={Link} to="/EmpowermentFailure">Last Challenge</Link>
        <Link onClick={authCheck} href="#top" className="first-challenge-link" as={Link} to="/mirror">Next Challenge</Link>
      </div>


      <h1 className="all-title">Bad Hand Challenge</h1>
      <Alert className="instruction-bullets" variant="primary">
        <p>List all the bad things life has given you from birth.
          Write everything that has bothered you about yourself.
          Were you bullied? Were you beaten? Were you poor? Are you insecure? Did you have a
          fortunate comfortable life, that hindered you? Are you dealing with something now?
          List every little detail life has dealt you. The challenges ahead will give you confidence, in dealing
        with these bad hands because you will be taking steps in flipping the script on your life.</p>
        {/* <ul className="instruction-bullets">
          <li>Make a list of the bad cards that life has dealt you in the past and present.</li>
        </ul> */}
      </Alert>



      {isLoaded?

        <form>
          <div className="all-main-containers">
            <div className="inner-container">
              <div style={{height:"50px",display:'flex',alignItems:"center",justifyContent:"center"}}>
                {message? <Message message={message}/>:null}
              </div>
              <div className="input-fix">
                <input autoComplete="off" name='input' onChange={letsChange} className="inputStyle list-input" type="text" value={input.name} placeholder="enter list item..."/>
                <button type='submit' style={{border:'none',backgroundColor:'white'}} onClick={addItems}>
                  <AddIcon/>
                </button>

              </div>

              <div>
                <ul className="list-container">

                  {
                    items.map(function(arrayItem,index){
                      return <ListItem
                        key={index}
                        id={arrayItem._id}
                        arrayItem={arrayItem}
                        deleteItem={deleteItem}
                             />
                    })
                  }
                </ul>
              </div>
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

export default BadHand;
