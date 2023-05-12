import React, {useState, useEffect, useContext, useRef} from "react";
import Image from "./Image.jsx";
import AddIcon from "../AddIcon";
import {Link} from "react-router-dom";
import ArmoredMindService from "../../Services/ArmoredMindService";
import {AuthContext} from "../../Context/AuthContext";
import Message from "../Message";
import AuthService from '../../Services/AuthService';
import {SpinnerDiamond} from 'spinners-react';
import {BsFillExclamationCircleFill} from "react-icons/bs"
import Accordion from 'react-bootstrap/Accordion';
import {GiCrestedHelmet} from 'react-icons/gi';
import {IconContext} from "react-icons";

const ArmoredMind = function(props) {

  //useState that will be used to hold the value of input
  const [value, setValue] = useState({imageURL: ""});
  //will contain all imageUrls
  const [array, setArray] = useState([]);
  //message when added or deleted
  const [message, setMessage] = useState(null);
  // spinner loader when items are being loaded from server
  const [isLoaded, setIsLoaded] = useState(false);
//used to check if input is empty when submitted
  const [submitCheck, setSubmitCheck] = useState(false);

  const auth = useContext(AuthContext);

  let timer = useRef(null);

  let httpRegex=/http/;

  let imageTypeRegex=/.jpg|.jpeg|.png/;

  function authCheck() {
    AuthService.isAuthenticated().then(data => {
      if (!data.isAuthenticated) {
        const {setIsAuthenticated, setUser} = auth;
        setIsAuthenticated(false);
        setUser({username: ""})
      }
    })
  }
  const controller = new AbortController()
  const signal= controller.signal;
  useEffect(() => {

    ArmoredMindService.getArmoredNotes(signal).then(data => {
      setIsLoaded(true);
      setArray(data.armoredmindurls);
    });

    return() => {
            clearTimeout(timer.current);
    }
  }, []);

  function handleChange(event) {
    const newValue = event.target.value;
    setValue({imageURL: newValue});
  }

  function addImage(e) {
    e.preventDefault();
    setSubmitCheck(true);

    if(httpRegex.test(value.imageURL) && imageTypeRegex.test(value.imageURL)) {
      ArmoredMindService.postArmoredNote(value).then(data => {
        ArmoredMindService.getArmoredNotes().then(getData => {
          if (!data.message.msgError) {
            setArray(getData.armoredmindurls)
            setMessage(data.message);
            console.log('i want to see this msg-->',data.message);
            timer.current = setTimeout(() => {
              setMessage(null)
            }, 2000);
          } else if (data.message.msgBody === "Unauthorized") {

            auth.setIsAuthenticated(false);
            auth.setUser(null);
          }
        });
      });
      setSubmitCheck(false);
      setValue({imageURL: ""});
    }
    else{
      console.log('not a real url');
      setMessage({msgBody:'🚫 Enter jpg or png image url',msgError:false});
      timer.current = setTimeout(() => {
        setMessage(null)
      }, 3000);
    }
  }

  function deleteImage(id) {
    ArmoredMindService.deleteArmoredNote(id).then(data => {
      ArmoredMindService.getArmoredNotes().then(getData => {
        if (!data.message.msgError) {
          setArray(getData.armoredmindurls);
          setMessage(data.message);
          timer.current = setTimeout(() => {
            setMessage(null)
          }, 2000);
        } else if (data.message.msgBody === "Unauthorized") {
          auth.setIsAuthenticated(false);
          auth.setUser(null);
        }
      })
    })
  }

  function emptyStyle() {
    //if value is '' and we hit add image(submitCheck =true)
    if (!value.imageURL && submitCheck) {
      return {marginRight: "10px", backgroundColor: "#ffdede"}
    } else {
      return {marginRight: "10px"}
    }
  }

  return (<div className="body-padding">
    <div className="next-prev-challenge-spacing">
      <Link onClick={()=>{authCheck();controller.abort();}} as={Link} to="/TakingSouls">Previous Challenge</Link>
      <Link onClick={()=>{authCheck();controller.abort();}} className="first-challenge-link" as={Link} to="/CookieJar">Next Challenge</Link>
    </div>
    <h1 className="all-title">Armored Mind Challenge</h1>
    <Accordion>
      <Accordion.Header>
        <IconContext.Provider value={{
            className: 'icon'
        }}>
          <GiCrestedHelmet size='25px'/>Instructions
        </IconContext.Provider>
      </Accordion.Header>
      <Accordion.Body>
        <p>Visualization is an important tool to reaching a goal. Visualize not only the victory but the challenges and failures.</p>
        <ul className="instruction-bullets" style={{
            width: "100%"
        }}>
          <li>Add images from the internet that will help you visualize your goals.</li>
          <li>Copy image address for example:
            <b style={{
                overflowWrap: "break-word"
            }}>
            https://impressivetrophies.com/wp-content/uploads/billboard-trophy.jpg</b>
          , paste inside input bar and add.</li>
        </ul>
      </Accordion.Body>
    </Accordion>

    <form>
      <div className="all-main-containers">
        <div className="inner-container" style={{
            marginBottom: '20px',
            position: 'relative'
        }}>
          <div style={{
              height: "34px"
          }}>
            {
              !value.imageURL && submitCheck
                ? <p style={{
                  color: "#bf2121",
                  marginBottom: "0",
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '10px',
                  height: '34px'
                }}><BsFillExclamationCircleFill style={{
                  color: "#bf2121"
                }}/></p>
                : null
            }
          </div>
          <div className="input-fix" style={{
              paddingBottom: "0",
              height: "42px"
          }}>
            <input type="text" style={emptyStyle()} className="inputStyle list-input" onChange={handleChange} value={value.imageURL}/> {/* <button onClick={addImage} type="button" className="btn btn-primary">add</button> */}
            <button type='submit' className="button-top-right" onClick={addImage}>
              <AddIcon/>
            </button>
          </div>

          <div style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: '40px',
              paddingLeft: '15px'
            }}>
            {
              message
                ? <Message message={message}/>
                : null
            }
          </div>

        </div>
      </div>
    </form>

    {
      isLoaded
        ? <div className="row">
            {
              array.map(function(arrayItem, index) {
                return <Image key={index} id={arrayItem._id} arrayItem={arrayItem.imageURL} deleteImage={deleteImage}/>
              })
            }
          </div>
        : <div className="all-main-containers">
            <SpinnerDiamond size="150px"/>
          </div>
    }

  </div>);
}

export default ArmoredMind;
