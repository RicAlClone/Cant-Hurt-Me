import React from "react";
const About= function(){
  return(
    <div className="body-padding">
      <div className="list-entries" style={{width:"320px",margin:"0 auto 0 auto"}}>
        <a  className="btn btn-light btn-lg" href="http://localhost:3000/Register">Register</a>
        <a className="btn btn-dark btn-lg" href="http://localhost:3000/SignIn">Sign in</a>
      </div>
      <h1>Can't Hurt me Challenges</h1>
      <p style={{textIndent:"20px"}}>These 10 challenges are based on David Goggins book Can't hurt me. David goggins is a former navy seal and now ultra
      marathon runner. David wrote this book to teach people how to overcome adversity through the power of your mind.</p>
      <img className="goggins-pic" alt="David Goggins running" src="https://thebaldbrothers.com/wp-content/uploads/2020/02/David-Goggins.png"/>

      <ol >
        <li><b> Bad Hand Challenge</b>
          <p> List all the bad things life has given you.</p>
        </li>
        <li><b> The Accountability Mirror Challenge</b>
          <p> Make notes on all your insecurities, dreams, and goals.</p>
        </li>
        <li><b> Calloused Mind Challenge</b>
          <p>List all the things you hate to do.</p>
        </li>
        <li><b> Taking Souls Challenge</b>
          <p>Note times you were able to outwork someone in anything.</p>
        </li>
        <li><b> Armored Mind Challenge</b>
          <p>Visualize the challenges and how you will confront them.</p>
        </li>
        <li><b> The Cookie Jar Challenge</b>
          <p>Enter all accomplishments,goals met, and obstacles overcame.</p>
        </li>
        <li><b> 40 Percent Rule Challenge</b>
          <p> When your mind tells you to stop. You have 40% more to give. Enter things like exercise and try to gradually increment by 5-10%.</p>
        </li>
        <li><b> Schedule Challenge</b>
          <p>Enter your normal routine for the first week. The second week you want to improve your schedule. The third week should be your perfect schedule.</p>
        </li>
        <li><b> Uncommon Challenge</b>
          <p>Note the times when you were uncommon amongst people you are surrounded by.</p>
        </li>
        <li><b> Empowerment of Failure Challenge</b>
          <p>Note all the failures you had with these challenges. Note the posititves and how you will fix the failures from these challenges.</p>
        </li>

      </ol>

      <div className="list-entries" style={{width:"320px",margin:"0 auto 0 auto"}}>
        <a  className="btn btn-light btn-lg" href="http://localhost:3000/Register">Register</a>
        <a className="btn btn-dark btn-lg" href="http://localhost:3000/SignIn">Sign in</a>
      </div>

      <div>
        <a className="first-challenge-link" href="http://localhost:3000/BadHand">Go to first Challenge</a>
      </div>

    </div>
    );

};

export default About;
