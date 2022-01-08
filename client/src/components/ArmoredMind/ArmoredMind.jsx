import React,{useState,useEffect,useContext,useRef} from "react";
import Image from "./Image.jsx";
import AddIcon from "../AddIcon";
import {Link} from "react-router-dom";
import ArmoredMindService from "../../Services/ArmoredMindService";
import {AuthContext} from "../../Context/AuthContext";
import Message from "../Message";

//add logic for our Message/timeout
  //when we add a pic lets create a message without a timeout


const ArmoredMind= function(props){

const [value, setValue] = useState({imageURL:""});

const [array, setArray]= useState([]);

const [message,setMessage]=useState(null);

const auth= useContext(AuthContext);


  let timer= useRef(null);

useEffect(()=>{
ArmoredMindService.getArmoredNotes().then(data=>{
  console.log('getting data on line 28',data);
  setArray(data.armoredmindurls);
});

return ()=>{
  console.log('we trigger clearTimeout inside useEffect');
   clearTimeout(timer);
}
},[]);



function handleChange(event){
  const newValue=event.target.value;
  setValue({imageURL:newValue});
}

function addImage(){
  if(value.imageURL!==""){

    ArmoredMindService.postArmoredNote(value).then(data=>{
          ArmoredMindService.getArmoredNotes().then(getData=>{
              if(!data.message.msgError){
                setArray(getData.armoredmindurls)
                setMessage(data.message);
                timer= setTimeout(()=>{
                  setMessage(null)
                  console.log('timer is setting message to null');
                },2000);
              }
              else if(data.message.msgBody === "Unauthorized"){

                auth.setIsAuthenticated(false);
                auth.setUser(null);
              }
          });
    });

setValue({imageURL:""});
}
}

function deleteImage(id){
  console.log(id);
ArmoredMindService.deleteArmoredNote(id).then(data=>{
  ArmoredMindService.getArmoredNotes().then(getData=>{
    if(!data.message.msgError){
      setArray(getData.armoredmindurls);
      setMessage(data.message);
      timer= setTimeout(()=>{setMessage(null)},2000);
    }
    else if(data.message.msgBody === "Unauthorized"){
      auth.setIsAuthenticated(false);
      auth.setUser(null);
    }
  })
})
}



  return(
    <div className="body-padding">
      <h1 className="all-title">Armored Mind Challenge</h1>
      <ul className="instruction-bullets">
        <li>Visualize not only a goal but every step it takes to reach it.</li>
        <li>Add images from the internet that will help you visualize your goals.</li>
        <li>Copy image address for example: <b> https://impressivetrophies.com/wp-content/uploads/billboard-trophy.jpg ,</b> paste inside input bar and add.</li>
      </ul>

      <div className="all-main-containers">
        <div className="inner-container">
          <div className ="input-fix">
            <input type="text" className="list-input" onChange={handleChange} value={value.imageURL}/>
            {/* <button onClick={addImage} type="button" className="btn btn-primary">add</button> */}
            <div onClick={addImage}>
              <AddIcon/>
            </div>
          </div>
        </div>
      </div>

      {message?<Message message={message}/> : null}

      <div className="row">
        {array.map(function(arrayItem,index){
          return <Image
            key={index}
            id={arrayItem._id}
            arrayItem={arrayItem.imageURL}
            deleteImage={deleteImage}
                 />
        })
        }
      </div>
      <div>
        <Link className="first-challenge-link" as={Link} to="/CookieJar">Next Challenge</Link>      </div>
      </div>
      );
      }

export default ArmoredMind;
