import React from "react";
import Week1 from "./Week1/Week1";
import Week2 from "./Week2/Week2";
import Week3 from "./Week3/Week3";
import {Link} from "react-router-dom";
const Schedule= function(){

  return(
    // className="body-padding"
    <div>
      <div className="body-padding">
        <h1 className="all-title">Schedule Challenge</h1>
        <ul className="instruction-bullets">
          <p>Each day is made up of 96, 15 minute blocks.</p>

          <div style={{padding:"15px"}}>
            <p><b>Week 1</b><li>Document your normal daily activities with the blocks.</li></p>

          </div>
          <div style={{padding:"15px"}}>
            <p><b>Week 2</b></p>
            <li>Optimize your week by cutting out unproductivity. When a block is scheduled only focus on that activity.</li>
          </div>
          <div style={{padding:"15px"}}>
            <p><b>Week 3</b></p>
            <li>If there is room for optimization do so without sacrificing sleep.</li>
          </div>
        </ul>


      </div>

      
      <Week1
        weekName={"Week 1"}

      />
      <Week2
        weekName={"Week 2"}

      />
      <Week3
        weekName={"Week 3"}

      />


      <div className="body-padding">
        <div>
          <Link className="first-challenge-link" as={Link} to="/Uncommon">Next Challenge</Link>        </div>
      </div>
    </div>
  );
};

export default Schedule;
