import React, {useState, useEffect, useRef, useContext} from "react";
import TheCookie from "./TheCookie";
import AddIcon from "../AddIcon";
import {Link} from "react-router-dom";
import CookieJarService from "../../Services/CookieJarService"
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import{BsFillExclamationCircleFill} from "react-icons/bs";
import Accordion from 'react-bootstrap/Accordion';

import {FaCookie} from "react-icons/fa";
import {BiCookie} from 'react-icons/bi';
import { IconContext } from "react-icons";


const CookieJar = function() {

  const [cookie, setCookie] = useState({cookie: ""});


  const [array, setArray] = useState([]);

  const [animation, setAnimation] = useState("");
  const [secAni, setSecAni] = useState("");
  const [message, setMessage] = useState(null);
  const [required,setRequired]=useState(false);

  const authContext = useContext(AuthContext);

  let timer = useRef(null);
  let aniProblem = useRef(null);

  function authCheck(){
  AuthService.isAuthenticated().then(data=>{
    if(!data.isAuthenticated){
      const {setIsAuthenticated,setUser}=authContext;
      setIsAuthenticated(false);
      setUser({username:""})
    }
  })
  }

  useEffect(() => {
    CookieJarService.getCookies().then((data) => {
      setArray(data.cookies)
    });
    return() => {
      clearTimeout(timer.current);
      clearTimeout(aniProblem);
    }
  }, []);

  const [index2, setIndex2] = useState(0);
  const [turnOn, setTurnOn] = useState(false);

  function handleChange(event) {
    const newValue = event.target.value;
    setCookie({cookie: newValue});
    setAnimation("");
  }

  function addCookie(e) {
    e.preventDefault();
    setRequired(true);
    if(!cookie.cookie){
      console.log('cookie is empty')
    }
    else {
      setRequired(false);
      CookieJarService.postCookie(cookie).then((data) => {
        if (!data.message.msgError) {
          CookieJarService.getCookies().then((getData) => {
            setArray(getData.cookies);
            setMessage(data.message);
            timer.current = setTimeout(() => {
              setMessage(null)
            }, 2000);
          })
          setAnimation("rect");
          setCookie({cookie: ""});
        } else if (data.message.msgBody === "Unauthorized") {
          authContext.setUser({username: ""});
          authContext.setIsAuthenticated(false);
          setMessage(data.message);
        }
      })
    }
  }

  function next() {

    setSecAni("down");

    let randomNum = Math.floor(Math.random() * array.length);

    if (!turnOn) {
      setIndex2(randomNum);
      setTurnOn(true);
    }

    if (index2 >= array.length - 1) {
      setIndex2(0);
    } else {
      setIndex2((prev) => {
        if (prev === array.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }

    aniProblem = setTimeout(() => {
      setSecAni("")
    }, 1000);
  };

  function deleteCookie(id) {
    CookieJarService.deleteCookie(id).then(data => {

      if (!data.message.msgError) {
        CookieJarService.getCookies().then(data => setArray(data.cookies));
        setMessage(data.message);
        timer.current = setTimeout(() => {
          setMessage(null)
        }, 2000);
      } else if (data.message.msgBody === "Unauthorized") {
        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
        setMessage(data.message);
      }
    });
  }

  function emptyStyle(){
  if(required && !cookie.cookie){
    return {
      marginRight:"10px",

      backgroundColor:"#ffdede"
    }
    }
    else{
      return {marginRight:"10px"}
    }
  }

  return (
    <div className="body-padding">
      <div className="next-prev-challenge-spacing">
        <Link onClick={authCheck} as={Link} to="/ArmoredMind">Previous Challenge</Link>
        <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/PercentRule">Next Challenge</Link>
      </div>
      <h1 className="all-title">The Cookie Jar</h1>

      <Accordion>
        <Accordion.Header>
          <IconContext.Provider value={{className:'icon'}}>
            <BiCookie size='25px'/>Instructions
          </IconContext.Provider>

        </Accordion.Header>
        <Accordion.Body>
          <p>
            This challenge is to get motivation and energy, in a time where you want to quit. The cookie is
            any obstacle that you have passed in life or goal you have accomplished. Steps to reaching a goal everyday can get repetative
            and fatiguing. In these times you need to reach in to your cookie jar and get a cookie that reminds you
            how much of a badass you can be.
          </p>
          <ul >
            <li>Enter anything you achieved no matter how small or big.</li>
            <li>Once added you can click on the cookie jar to get a reminder of an accomplishment you can use as motivation.</li>
          </ul>
        </Accordion.Body>
      </Accordion>


      <form>
        <div className="all-main-containers">
          <div className="inner-container" style={{marginBottom:'20px',position:'relative'}}>

            <div style={{height:"34px"}}>
              {required && !cookie.cookie?
                <p style={{color:"#bf2121",marginBottom:"0",display:'flex',alignItems:'center',marginLeft:'10px',height:'34px'}}><BsFillExclamationCircleFill style={{color:"#bf2121"}}/></p>
              :
                null
              }
            </div>

            <div className="input-fix" style={{paddingBottom:"0",height:"42px"}}>

              <input onChange={handleChange} style={emptyStyle()} className="inputStyle list-input" type="text" value={cookie.cookie}/>
              {/* className='add-button' */}
              <button type='submit' className="button-top-right" onClick={addCookie}>
                <AddIcon/>
              </button>

            </div>
            <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",height:'40px',paddingLeft:'15px'}}>
              {message?<Message message={message}/> : null}
            </div>

          </div>
        </div>
      </form>




      <div id={animation} onClick={next} className="jar-container" style={{position:"relative",height:'300px',width:'300px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height: "300px", width: "300px"}}><g><path d="M164 32.14c-7 0-13.7 2.8-18.8 7.74-5 4.95-7.8 11.72-7.8 18.82l.1 30.28v11.72c-5.5 1.6-9.8 6.7-9.8 12.8 0 7.5 6.2 13.5 13.6 13.5h16.5v8.6l-24.3 16.7c-17.3 12-27.5 31.4-27.5 52.2v211c0 35.5 29 64.4 64.5 64.4h171.1c35.5 0 64.4-28.9 64.4-64.4v-211c0-20.8-10.2-40.2-27.5-52.2l-24.2-16.7V127h16.5c7.3 0 13.3-6 13.3-13.5 0-6.1-4.1-11.2-9.6-12.8v-42c0-7.1-2.8-13.87-7.8-18.82-5.1-4.94-11.8-7.74-18.8-7.74H164zm0 17.85h184c2.2 0 4.5.97 6.1 2.58 1.3 1.3 2.1 2.9 2.3 4.73L244.3 69.45c-5 .54-8.5 4.95-8 9.9.5 4.98 5 8.5 9.8 7.98l110.4-12.07v24.84H155.4v-2.94l44-4.76c5-.62 8.5-4.97 8-9.94-.5-4.94-5-8.49-9.8-7.96l-42.2 4.63V58.7c0-2.37 1-4.51 2.5-6.13 1.6-1.61 4-2.58 6.1-2.58zM180.1 127h151.7v20.4l34.1 23.4c11 7.6 17.7 20.3 17.7 33.7v211c0 23.6-18.9 41.9-42 41.9H170.5c-23.2 0-42-18.3-42-41.9v-211c0-13.4 6.6-26.1 17.6-33.7l34-23.4V127zM289 147.1v23.8l49.6 34.3c1.2.9 2 2.2 2 3.8v202.1c0 9.7-3 18.3-8.5 25.9 12.9-1.2 27-13 27-25.9V208.9c0-8.3-4-16.2-10.8-20.9l-40.7-28.1v-12.8H289z" fill="#000000" fill-opacity="1"></path></g></svg>

        <div style={{position:'absolute',top:"40%",right:"35%",color:"#bd7e00"}}>
          <FaCookie size='70px'/>
        </div>
        <div style={{position:'absolute',bottom:"13%",left:"30%",color:"#bd7e00"}}>
          <FaCookie size='70px'/>
        </div>

      </div>

      {
        turnOn
          ? array.map((element, index)=>{

            if (index === index2) {

              return <TheCookie
              key={index}
              array={array}
              index={index}
              secAni={secAni}
              delete={deleteCookie}/>
          }
        })
        : null
    }


  </div>);
};

export default CookieJar;
