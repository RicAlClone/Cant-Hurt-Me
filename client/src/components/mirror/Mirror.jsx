// This is going to be like our App
import React, {useState, useEffect, useRef, useContext} from "react";
import CreateArea from "./CreateArea";
import EachNote from "./EachNote";
import {Link} from "react-router-dom";
import MirrorService from "../../Services/MirrorService";
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import { SpinnerDiamond,SpinnerCircularFixed } from 'spinners-react';
import FileBase64 from 'react-file-base64';
import {Alert, Button} from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { IconContext } from "react-icons";
import {GiMirrorMirror} from 'react-icons/gi';


const Mirror = function(props) {

  const authContext = useContext(AuthContext);

  const [array, setArray] = useState([]);

  const [message, setMessage] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);


const [image,setImage]=useState({image:""});
const [imageID,setImageID]=useState('');
//boolean to check if database contains an image set by user
const [imageExists,setImageExists]=useState(false);
const [newImage,setNewImage]=useState(false);
const [imageLoader,setImageLoader]=useState(false);
//
const [initialImageLoading,setInitialImageLoading]=useState(false);
const [hide,setHide]=useState(false);

  let timer = useRef(null);

const [isLoaded,setIsLoaded]=useState(false);

  function authCheck(){
  AuthService.isAuthenticated().then(data=>{
    if(!data.isAuthenticated){
      const {setIsAuthenticated,setUser}=authContext;
      setIsAuthenticated(false);
      setUser({username:""})
    }
  })
  }
  const controller = new AbortController()
  const signal= controller.signal;
  useEffect(() => {

    MirrorService.getMirrorNotes(signal).then(data => {
      setIsLoaded(true);
      setArray(data.mirrors);
    })

    setInitialImageLoading(true);
    MirrorService.getImage(signal).then(data=>{
      //if there is an image then set imageExist to true
      if(data.documents.length>0){
        setImage({image:data.documents[0].image})
        setInitialImageLoading(false);
        setImageExists(true);
        setImageID(data.documents[0]._id);
      }
      //no image exists so initialImageLoading is false
      else if(data.documents.length===0){
      setInitialImageLoading(false);
      }
    })
    return() => {
      clearTimeout(timer.current);
    }

  }, []);

  function addNote(note) {
    MirrorService.postMirrorNote(note).then(data => {
      if (!data.message.msgError) {

        MirrorService.getMirrorNotes().then(getData => {
          setArray(getData.mirrors);
          setMessage(data.message);
          timer.current = setTimeout(() => {
            setMessage(null)
          }, 2000)

        })

      } else if (data.message.msgBody === "Unauthorized") {
        setMessage(data.message);
        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
      }


    });

  };

  function deleteNote(id) {

MirrorService.deleteMirrorNote(id).then(data=>{
if(!data.message.msgError){

  MirrorService.getMirrorNotes().then(getData=>{
    setArray(getData.mirrors);

    setMessage(data.message);
    timer.current = setTimeout(() => {
      setMessage(null)
    }, 2000);
  })
}else if(data.message.msgBody === "Unauthorized"){
  setMessage(message);
  authContext.setUser({username:""});
  authContext.setIsAuthenticated(false);
}else{
  setMessage(message);
  timer.current = setTimeout(() => {
    setMessage(null)
  }, 2000);
}

})

  };

function addImage(){
  setHide(true);
  setImageLoader(true);
  MirrorService.postImage(image).then(data=>{
    if(!data.message.msgError){
      MirrorService.getImage().then(gData=>{
        setImage({image:gData.documents[0].image})
        setImageID(gData.documents[0]._id)
        setImageMessage(data.message);
        console.log(imageMessage);
        timer.current = setTimeout(() => {
          setImageMessage(null);
          setHide(false);
        }, 2000)

//spinner while we add image
        setImageLoader(false);
        setNewImage(false);
        setImageExists(true);

      })
    }
    else if(data.message.msgBody==="Unauthorized"){
      authContext.setUser({username:""});
      authContext.setIsAuthenticated(false);
    }

  })
}

function updateImage(){
  setHide(true);
  setImageLoader(true);
MirrorService.updateImage(imageID,image).then(data=>{
  if(!data.message.msgError){
    MirrorService.getImage().then(gData=>{
      setImage({image:gData.documents[0].image})
      setImageMessage(data.message);

      timer.current = setTimeout(() => {
        setImageMessage(null);
        setHide(false);
      }, 2000)

      setImageLoader(false);
      setNewImage(false);
        })
  }
  else if(data.message.msgBody==="Unauthorized"){
    authContext.setUser({username:""});
    authContext.setIsAuthenticated(false);
  }
  })
}

  return (
    <div className="body-padding">

      <div className="next-prev-challenge-spacing">
        <Link onClick={()=>{authCheck();controller.abort();}} as={Link} to="/BadHand">Previous Challenge</Link>
        <Link onClick={()=>{authCheck();controller.abort();}} className="first-challenge-link" as={Link} to="/Calloused">Next Challenge</Link>
      </div>

      <h1 className="all-title">The Accountability Mirror Challenge</h1>
      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <GiMirrorMirror size='25px'/>Instructions
          </IconContext.Provider>
        </Accordion.Header>
        <Accordion.Body>
          <p>In this challenge you must face and be brutaly honest about yourself. If you are lazy then
            call yourself lazy. Are you are overweight? Call yourself
            fat. There is no need to sugar coat it. Write down all goals and every step it takes to get there. For example if you have a goal
            of losing 40 pounds, make a note of losing 2 pounds in a week. Once you lose 2 pounds,delete the note and
          write another of losing 3 pounds.</p>

        </Accordion.Body>
      </Accordion>


      <CreateArea
        addNote={addNote}
        inputPlaceHolder="Title ..."
        textAreaPlaceHolder="Notes ..."
        message={message}
      />

      <Alert className="instruction-bullets" style={{marginBottom:"20px"}} variant="primary">
        Choose file to add/or update an image
      </Alert>

      <div style={{height:"400px"}}>
        <div style={{height:"50px"}}>
          {
            hide?
              null
            :
            <div style={{width:"235px",margin:"0 auto"}}>
              <FileBase64
                type="file"
                multiple={ false }
                onDone={ ({base64})=>{
                  //when this is loaded we send the save button down below
                  setNewImage(true);
                  setImage({image:base64} )
                }
                }
              />
            </div>
          }
        </div>

        {
          //will use a spinner while we check if database contains an image or not
          initialImageLoading?
            <SpinnerCircularFixed style={{display:"block",margin:'0 auto'}} size="50px"/>
          :
          null
        }

        {
          image.image?
            <>
              <img style={{display:"block",width:"235px",height:"300px",margin:"0 auto",paddingBottom:"20px"}} src={image.image} alt=""></img>
            </>
          :
          null
        }

        {
          //update button with appear when we try to update an image
          imageExists&&newImage&&!hide?
            <>
              <Button variant="primary" style={{display:"block",margin:"0 auto"}} onClick={updateImage}>update image</Button>
            </>
          :null
        }


        {
          //first time adding an image
          !imageExists&&newImage&&!hide?
            <>
              <Button variant="primary" style={{display:"block",margin:"0 auto"}} onClick={addImage}>save image</Button>
            </>
          :null
        }
        {
          //spinner while added image waits to display
          imageLoader?
            <SpinnerCircularFixed style={{display:"block",margin:'0 auto'}} size="50px"/>
          :
          null
        }
        {
          //will either be null or updated ✔
          imageMessage?
            <Message message={imageMessage} check={true}/>
          :null
        }
      </div>
      {isLoaded?
        <div className="container">
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
          </div>
      :
      <div className="all-main-containers">
        <SpinnerDiamond size="150px"/>
      </div>
      }

      </div>
      );
};

export default Mirror;
