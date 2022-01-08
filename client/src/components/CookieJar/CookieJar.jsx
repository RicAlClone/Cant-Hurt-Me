import React, {useState, useEffect, useRef, useContext} from "react";
import TheCookie from "./TheCookie";
import AddIcon from "../AddIcon";
// import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import CookieJarService from "../../Services/CookieJarService"
import Message from "../Message";
import {AuthContext} from "../../Context/AuthContext";

const CookieJar = function() {

  const [cookie, setCookie] = useState({cookie: ""});

  // const [value, setValue] = useState("");

  const [array, setArray] = useState([]);

  const [animation, setAnimation] = useState("");
  const [secAni, setSecAni] = useState("");
  const [message, setMessage] = useState(null);

  const authContext = useContext(AuthContext);

  let timer = useRef(null);
  let aniProblem = useRef(null);

  useEffect(() => {
    CookieJarService.getCookies().then((data) => {
      setArray(data.cookies)
    });
    return() => {
      clearTimeout(timer);
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
    if (cookie.cookie !== "") {
      CookieJarService.postCookie(cookie).then((data) => {
        if (!data.message.msgError) {
          CookieJarService.getCookies().then((getData) => {
            setArray(getData.cookies);
            setMessage(data.message);
            timer = setTimeout(() => {
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
        timer = setTimeout(() => {
          setMessage(null)
        }, 2000);
      } else if (data.message.msgBody === "Unauthorized") {
        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
        setMessage(data.message);
      }
    });
  }

  return (<div className="body-padding">

    <h1 className="all-title">The Cookie Jar</h1>

    <ul className="instruction-bullets">
      <li>Enter anything you achieved no matter how small or big.</li>
      <li>Once added you can click on the cookie jar to get a reminder of an accomplishment you can use as motivation.</li>
    </ul>

    <form>
      <div className="all-main-containers">
        <div className="inner-container">

          <div className="input-fix">
            <input onChange={handleChange} className="list-input" type="text" value={cookie.cookie}/>

            <button type='submit' className='add-button' onClick={addCookie}>
              <AddIcon/>
            </button>

          </div>
        </div>
      </div>
    </form>

    {
      message
        ? <Message message={message}/>
        : null
    }

    <div className="jar-container">
      <img id={animation} onClick={next} alt="" className="jar-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq31itfKS7ZxcGsmAn9lOJvwYwfLO3Bc5kPO8SqzKaHTNIMxtLYQsfq5PnEwutWpSaQiChUqmHTViqzNMiAtP3IR1aUalZ0pp-wg&usqp=CAU&ec=45750088"/>
    </div>

    {
      turnOn
        ? array.map((element, index) => {

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

    <div>
      <Link className="first-challenge-link" as={Link} to="/PercentRule">Next Challenge</Link>
    </div>
  </div>);
};

export default CookieJar;
