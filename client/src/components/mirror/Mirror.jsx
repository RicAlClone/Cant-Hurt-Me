// This is going to be like our App
import React, {useState, useEffect, useRef, useContext} from "react";
import CreateArea from "./CreateArea";
import EachNote from "./EachNote";
import {Link} from "react-router-dom";
import MirrorService from "../../Services/MirrorService";
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";
//lets test ourselfs in using our message component and using the timer component when making a message

const Mirror = function(props) {

  const authContext = useContext(AuthContext);

  const [array, setArray] = useState([]);

  const [message, setMessage] = useState(null);

  let timer = useRef(null);

  useEffect(() => {

    MirrorService.getMirrorNotes().then(data => {
      console.log(data);
      setArray(data.mirrors);
        // setArray(data.mirrorArray);
    })
    //we return a function that return clearTimeout so we can unmount
    return() => {
      clearTimeout(timer);
    }

  }, []);

  function addNote(note) {
    console.log('our note is ',note);
    MirrorService.postMirrorNote(note).then(data => {
      if (!data.message.msgError) {

        MirrorService.getMirrorNotes().then(getData => {
          setArray(getData.mirrors);
            // setArray(getData.mirrorArray);

          setMessage(data.message);
          timer = setTimeout(() => {
            setMessage(null)
          }, 2000)

        })

      } else if (data.message.msgBody === "Unauthorized") {
        setMessage(data.message);
        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
        console.log('else if (is Unauthorized)')
      } else {
        setMessage(data.message);
        timer = setTimeout(() => {
          setMessage(null)
        }, 2000);
      }

    });

  };

  function deleteNote(id) {
    console.log(id);
    console.log(typeof id);

MirrorService.deleteMirrorNote(id).then(data=>{
console.log(data.message);
if(!data.message.msgError){

  MirrorService.getMirrorNotes().then(getData=>{
    setArray(getData.mirrors);
    // setArray(getData.mirrorArray);

    setMessage(data.message);
    timer = setTimeout(() => {
      setMessage(null)
    }, 2000);
  })
}else if(data.message.msgBody === "Unauthorized"){
  setMessage(message);
  authContext.setUser({username:""});
  authContext.setIsAuthenticated(false);
}else{
  setMessage(message);
  timer = setTimeout(() => {
    setMessage(null)
  }, 2000);
}

})

  };

console.log(array);

  return (<div className="body-padding">
    <h1 className="all-title">The Accountability Mirror Challenge</h1>
    <ul className="instruction-bullets">
      <li>Make notes on all your insecurities, dreams, and goals.</li>
      <li>Note every step it will take to reach a goal.</li>
    </ul>

    <CreateArea
      addNote={addNote}
      inputPlaceHolder="Note title..."
      textAreaPlaceHolder="Any insecuries, dreams, or goals..."
    />

    <div className="row">
      {
        array.map(function(item, index) {

          return <EachNote
            key={index}
            id={item._id}
            title={item.title}
            message={item.message}
            deleteNote={deleteNote}
                 />
        })
      }
    </div>

    {
      message
        ? <Message message={message}/>
        : null
    }

    <div>
      <Link className="first-challenge-link" as={Link} to="/Calloused">Next Challenge</Link>
    </div>
  </div>);
};

export default Mirror;
