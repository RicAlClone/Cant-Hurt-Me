import React,{useContext,useEffect} from "react";
import Week1 from "./Week1/Week1";
import Week2 from "./Week2/Week2";
import Week3 from "./Week3/Week3";
import {Link} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import {Alert} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import {AiOutlineSchedule} from 'react-icons/ai';
import { IconContext } from "react-icons";


const Schedule= function(){
const authContext=useContext(AuthContext);
const controller = new AbortController();
const signal = controller.signal;

  function authCheck(){
    console.log('auth check in schedule');
  AuthService.isAuthenticated().then(data=>{
    if(!data.isAuthenticated){
      const {setIsAuthenticated,setUser}=authContext;
      setIsAuthenticated(false);
      setUser({username:""})
    }
  })
  }

let mounted=true;
useEffect(()=>{
  return ()=>{
    mounted=false;
    controller.abort();
  }
},[]);

  return(
    // className="body-padding"
    <div>
      <div className="body-padding" style={{paddingBottom:'20px'}}>
        <div className="next-prev-challenge-spacing">
          <Link onClick={authCheck} as={Link} to="/PercentRule">Previous Challenge</Link>
          <Link onClick={authCheck} className="first-challenge-link" as={Link} to="/Uncommon">Next Challenge</Link>
        </div>

        <h1 className="all-title">Schedule Challenge</h1>
        <Accordion>
          <Accordion.Header>
            <IconContext.Provider value={{className:'icon'}}>
              <AiOutlineSchedule size='25px'/>Instructions
            </IconContext.Provider>
          </Accordion.Header>
          <Accordion.Body>
            <p >
              This challenge will help you cut out all wasted time. You will cut your day into time slots and that
              will help you recognize what you can optimize. For the first week, document what you did for every 15 minute
              time block in a day. The second week you want to improve your schedule by cutting out the wasted time.
              Your going to want to follow every scheduled time block completely and move on to the next, once completed.You can schedule breaks that help
              you rest but that doesn't mean do unecessary things like checking emails or social media. Give yourself
              enough time for meals but don't leave them open ended. Even after scheduling week 2 there still might be
              some dead space. Week 3 is your perfect schedule with no time wasted.
            </p>
            <ul >
              <p>☀ Each day is made up of 96, 15 minute blocks.</p>

              <div style={{paddingBottom:"15px"}}>
                <b>Week 1</b><li>Document your normal daily activities with the blocks.</li>
              </div>
              <div style={{paddingBottom:"15px"}}>
                <b>Week 2</b><li>Optimize your week by cutting out unproductivity. When a block is scheduled only focus on that activity.</li>
              </div>
              <div style={{paddingBottom:"15px"}}>
                <b>Week 3</b>
                <li>If there is room for optimization do so without sacrificing sleep.</li>
              </div>
            </ul>
          </Accordion.Body>
        </Accordion>


      </div>
      <div className='body-padding' style={{paddingTop:'20px',paddingBottom:'20px'}}>
        <Alert className="instruction-bullets"  variant='success'>


          {/* style={{width:'100%'}} */}

          <ol >
            <h6>Steps</h6>
            <li>Click edit</li>
            <li>Choose event</li>
            <li>Choose time block to fill and save</li>
          </ol>


        </Alert>
      </div>
      <Week1
        weekName={"Week 1"}
        authCheck={authCheck}
        controller={controller}
        signal={signal}
        mounted={mounted}
      />
      <Week2
        weekName={"Week 2"}
        authCheck={authCheck}
        controller={controller}
        signal={signal}
        mounted={mounted}
      />
      <Week3
        weekName={"Week 3"}
        authCheck={authCheck}
        controller={controller}
        signal={signal}
        mounted={mounted}
      />



    </div>
      );
};

export default Schedule;
