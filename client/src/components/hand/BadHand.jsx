import React,{useState,useEffect,useRef, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import ListItem from "./ListItem";
import {Link} from "react-router-dom";
import BadhandService from "../../Services/BadhandService.js";
import AddIcon from "../AddIcon";
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond } from 'spinners-react';
import {BsFillExclamationCircleFill} from "react-icons/bs"
import Accordion from 'react-bootstrap/Accordion';
import {CgCardSpades} from 'react-icons/cg';
import { IconContext } from "react-icons";

const BadHand= function(){
//authContext is like useState for all components.
const authContext=useContext(AuthContext);

function authCheck(){
AuthService.isAuthenticated().then(data=>{
  //if our /authenticated route tells us we arent authenticated then we set
  //isAuthenticated to false and user to empty
  if(!data.isAuthenticated){
    //reaches into authContext to set isAuthenticated and user
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


let timer=useRef(null);

//use loading spinner if not loaded
const [isLoaded,setIsLoaded]=useState(false);
const [clickedToAdd,setClickedToAdd]=useState(false);

useEffect(()=>{
  const abortController = new AbortController()
  window.scrollTo(0,0);
  BadhandService.getBadhands().then(data=>{
    //once we recieve data set isloaded to true returning form
    setIsLoaded(true);
    newItems(data.badhands);
  });
return ()=>{
  abortController.abort();
  clearTimeout(timer.current);
}

},[]);



function letsChange(event){
  const newValue= event.target.value;
  setInput({name:newValue});
}


function addItems(e){
setClickedToAdd(true);
e.preventDefault();

if(!input.name){
  console.log('name is empty');
}
else{
setClickedToAdd(false);
  BadhandService.postBadhand(input).then((data)=>{

//if no errors then update newItems to database items
    if(!data.message.msgError){
      BadhandService.getBadhands().then(data=>{
        newItems(data.badhands);
      });

        setMessage(data.message);
        timer.current = setTimeout(() => {
          setMessage(null);
      }, 2000)

      setInput({name:""});
    }
    //if we are unauthorized we will be logged out
    else if(data.message.msgBody === "Unauthorized"){
      authContext.setUser({username:""});
      authContext.setIsAuthenticated(false);
    }
    else{
      setMessage(data.message);
      timer.current = setTimeout(() => {
        setMessage(null);
    }, 2000);
    }

  })
}
}


function deleteItem(id){

//sends over id of item to our route to delete from database
BadhandService.deleteBadhand(id).then(data=>{
  if(!data.message.msgError){

BadhandService.getBadhands().then(data => {
  newItems(data.badhands);
});
setMessage(data.message);
timer.current= setTimeout(() => {
  setMessage(null);
}, 2000);
}
else if (data.message.msgBody === "Unauthorized"){
  authContext.setUser({username:""});
  authContext.setIsAuthenticated(false);
}
else{
  setMessage(message);
  timer.current = setTimeout(() => {
    setMessage(null);
  }, 2000);
}
})
}
//if we add with an empty input it will give us a warning
function emptyInputError(){
  if(clickedToAdd && !input.name){
    return {
        backgroundColor:"#ffdede",
        marginRight:'10px'
    }
  }
  else{
    return {
       marginRight:'10px'
    }
  }
}

  return(
    <div className="body-padding">
      <div className="next-prev-challenge-spacing">
        <Link onClick={authCheck}  as={Link} to="/EmpowermentFailure">Last Challenge</Link>
        <Link onClick={authCheck} href="#top" className="first-challenge-link" as={Link} to="/mirror">Next Challenge</Link>
      </div>


      <h1 className="all-title">Bad Hand Challenge</h1>
      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <CgCardSpades size='25px'/>
          </IconContext.Provider>
        Instructions</Accordion.Header>
        <Accordion.Body>
          <p>
            List all the bad things life has given you from birth. Write everything that has bothered you about
            yourself. Were you bullied? Were you beaten? Were you poor? Are you insecure? Did you have a
            fortunate comfortable life, that hindered you? Are you dealing with something now?
            List every little detail life has dealt you. Once the challenges ahead start changing the script
            that is your life, you can come back and see the progress you made.
          </p>

        </Accordion.Body>

      </Accordion>

      {/* checks if is loaded */}
      {isLoaded?

        <form>
          <div className="all-main-containers">
            <div className="inner-container" style={{position:'relative'}}>

              <div style={{height:"45px",display:'flex',flexDirection:'column',justifyContent:'center',paddingLeft:'10px'}}>
                {/* if we try to add an empty note we get a warning */}
                {clickedToAdd && !input.name?<BsFillExclamationCircleFill
                  style={{color:"#bf2121",marginBottom:"0",display:'flex',alignItems:'center',marginLeft:'10px',height:'34px'
                  }}/>
                :null}
                {message?<Message message={message}/> : null}
              </div>
              <div className="input-fix" style={{paddingBottom:"0",height:"42px",marginBottom:'18px'}}>
                <input style={emptyInputError()} autoComplete="off" name='input' onChange={letsChange} className="inputStyle list-input" type="text" value={input.name} placeholder="Enter a bad hand..."/>
                <button type='submit' className="button-top-right"
                  onClick={addItems}>
                  <AddIcon/>
                </button>
              </div>

              <div>
                <ul className="list-container" style={{paddingTop:'0'}}>

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
