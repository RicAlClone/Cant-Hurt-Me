import React from 'react';
import {Link} from "react-router-dom";
import {Alert} from 'react-bootstrap';

const marginBottom={
  marginBottom:'20px'
}

function DailyInstructions(){
  return(

      <div className="main-contain" style={{marginTop:'50px',marginBottom:'50px'}}>
        <h1 style={marginBottom}>Daily Instructions</h1>
        <Alert variant='danger' style={marginBottom}>
          <p>
            For first time users you want to go through all challenges and then refer to instructions below.
            <Link  as={Link} to="/BadHand"> -->First Challenge</Link>
          </p>
        </Alert>

        <ul >
          <li style={marginBottom}>Attempt any challenges failed in
            <Link  as={Link} to="/EmpowermentFailure"> Empowerment of Failure Challenge</Link>. When straining to
            complete a goal or task, use a cookie from
            <Link  as={Link} to="/CookieJar"> The Cookie Jar</Link> to get a boost in confidence.
          </li>
          <li style={marginBottom}>Attempt, add, delete, or review a goal for today in
            <Link  as={Link} to="/Mirror"> Accountability Mirror Challenge</Link>
          </li>
          <li style={marginBottom}>Increase any baseline needed in
            <Link  as={Link} to="/PercentRule"> The 40 Percent Rule Challenge</Link>
          </li>
          <li style={marginBottom}>Note any failed challenges for today </li>
        </ul>

      </div>

  );
}

export default DailyInstructions;
