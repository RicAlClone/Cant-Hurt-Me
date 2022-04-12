import React,{useEffect,useContext,useState} from "react";
import {AuthContext} from "../Context/AuthContext";
import {Link} from "react-router-dom";
 function About(){
const {isAuthenticated,setIsAuthenticated,setUser,user}=useContext(AuthContext)

const [isLogged,setIsLogged]=useState(false);


useEffect(()=>{
  if(isAuthenticated){
    setIsLogged(true);
  }
  else{
    setIsLogged(false)
      }
},[])


const bookLink="https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512279/ref=asc_df_1544512279/?tag=hyprod-20&linkCode=df0&hvadid=316651574325&hvpos=&hvnetw=g&hvrand=256222697005570643&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9031226&hvtargid=pla-553981143753&psc=1"

  return(
    <div className="body-padding">
      {/* <div className="list-entries" style={{width:"320px",margin:"0 auto 0 auto"}}>
        <a  className="btn btn-light btn-lg" href="http://localhost:3000/Register">Register</a>
        <a className="btn btn-dark btn-lg" href="http://localhost:3000/Login">Login</a>
      </div> */}
      <h1>Can't Hurt me Challenges</h1>
      <p className="challenge-paragraph david-intro">
        These 10 challenges are based on David Goggins book <a href={bookLink}>Can't hurt me</a>.
        David goggins is a former navy seal and now ultra
      marathon runner. David wrote this book to teach people how to overcome adversity through the power of your mind.</p>
      <img className="goggins-pic" alt="David Goggins running" src="https://thebaldbrothers.com/wp-content/uploads/2020/02/David-Goggins.png"/>



      <ol >
        <li>
          <h5> Bad Hand Challenge</h5>
          <p className="challenge-paragraph">
            List all the bad things life has given you from birth. Write everything that has bothered you about
            yourself. Were you bullied? Were you beaten? Were you poor? Are you insecure? Did you have a
            fortunate comfortable life, that hindered you? Are you dealing with something now?
            List every little detail life has dealt you. Once the challenges ahead start changing the script
            that is your life, you can come back and see the progress you made.
          </p>
        </li>
        <li>
          <h5> The Accountability Mirror Challenge</h5>
          <p className="challenge-paragraph"> In this challenge you must face and be brutaly honest about yourself. If you are lazy then
            call yourself lazy and write how you will work your ass off to change. Are you are overweight? Call yourself
            fat. There is no need to sugar coat it. This challenge is intended to give yourself thicker skin and force
            yourself to change. Write down all goals and every step it takes to get there. For example if you have a goal
            of losing 40 pounds, make a note of losing 2 pounds in a week. Once you lose 2 pounds,delete the note and
            write another of losing 3 pounds.

          </p>
        </li>
        <li>
          <h5> Calloused Mind Challenge</h5>
          <p className="challenge-paragraph">
            This challenge is intended to toughen and build a callus over your mind. To do this we must get out
            of our comfort zone and do things everyday that we dont want to do,that will improve your life. Even if
            its as simple as making your bed, or washing your dishes. The key to this is doing it every day. Once this
            becomes normal and comfortable,its time to add more. For example if running 1 mile everyday becomes comfortable,
            increase it by 1.5 miles everyday.The goal is to keep callousing the mind.
          </p>
        </li>
        <li>
          <h5> Taking Souls Challenge</h5>
          <p className="challenge-paragraph">
            Taking souls means when you outwork or exceed expectation from a person who rivals or undermines you.
            In a competative setting taking souls is meant to break your component in a way you could see it in their
            reaction. An example David Goggins like to give is in the movie about a boxer, Rocky. In the movie Rocky 1, Rocky is getting
            beat sensless by the better opponent Apollo Creed. Appollo is able to knock Rocky down,and everyone is telling
            Rocky to stay down. When Rocky refuses, Apollo has a reaction of disbelief and it saps his energy.
            That reaction is what is considered taking ones soul. In a real life setting, you want to pass work expectation that
            a collegue,teacher,coach or boss, will have to respect you. You want to reach goals that they could never
            imagine themselves doing.

          </p>
        </li>
        <li>
          <h5> Armored Mind Challenge</h5>
          <p className="challenge-paragraph">
            Visualization is an important tool to reaching a goal. Visualize not only the victory but the challenges and failures.
          </p>
        </li>
        <li>
          <h5> The Cookie Jar Challenge</h5>
          <p className="challenge-paragraph">
            This challenge is to get motivation and energy, in a time where you want to quit. The cookie is
            any obstacle that you have passed in life or goal you have met. Steps to reaching a goal everyday can get repetative
            and fatiguing. In these times you need to reach in to your cookie jar and get a cookie that reminds you
            how much of a badass you can be.
          </p>
        </li>
        <li>
          <h5> 40 Percent Rule Challenge</h5>
          <p className="challenge-paragraph">
            This challenge is to push yourself more than what you think you are capable of. This challenge was born
            when David Goggins ran his first 100 mile marathon. He wanted to quit at mile 40, but continued with agony until he finished.
            That day is when David learned that humans can endure pain past what the mind thinks is capable of.
            A governor in a car is a device is used to measure or regulate the speed of the car. This challenge will help you slowly
            remove that governor from your mind. By incrementing your work load by 5-10% this will train your mind
            and slowly remove that governor without injury or regress.
          </p>
        </li>
        <li>
          <h5> Schedule Challenge</h5>
          <p className="challenge-paragraph">
            This challenge will help you cut out all wasted time. You will cut your day into time slots and that
            will help you recognize what you can optimize. For the first week, document what you did for every 15 minute
            time block in a day. The second week you want to improve your schedule by cutting out the wasted time.
            Your going to want to follow every scheduled time block completely and move on to the next, once completed.You can schedule breaks that help
            you rest but that doesn't mean do unecessary thing like checking emails or social media. Give yourself
            enough time for meals but don't leave them open ended.Even after scheduling week 2 there still might be
            some dead space. Week 3 is your perfect schedule with no time wasted.
          </p>
        </li>
        <li>
          <h5> Uncommon Challenge</h5>
          <p className="challenge-paragraph">
            Uncommon amongst uncommon is about being the best, in a group of people that are the best.This challenge is
            geared towards the people who are already successful and have reached the highest
            of goals they created. The people who feel they made it in life. David Goggins explains that some of these
            people feel they lost drive because they reached the top of a mountain and no longer are hungry. These
            individuals have to keep putting more effort everyday and climb new bigger mountains. For the common person
            who are trying to become uncommon, the first step is to find an uncommon person and get to their level. The second
            step is to actually work harder than them. For example if Bruce Lee practiced 1000 kicks a day, then you will
            have to practice 1001 kicks a day.
          </p>
        </li>
        <li>
          <h5> Empowerment of Failure Challenge</h5>
          <p className="challenge-paragraph">
            Note all the failures you had with these challenges. Note the positives from these failures. Note your
            mind set during your failing and how that made you feel. Note how you can tackle these failures again
            and schedule it. If you keep failing dont give up and keep attacking until you reach the goal.
          </p>
        </li>

      </ol>

      {isLogged?
        <div className="first-challenge-link-container">
          <Link to="/BadHand">First Challenge</Link>
        </div>

      :
      <div className="list-entries" style={{width:"320px",margin:"0 auto 0 auto"}}>
        <div >
          <Link className="btn btn-light btn-lg" to="/Register">Register</Link>
        </div>

        <div >
          <Link className="btn btn-dark btn-lg" to="/Login">Login</Link>
        </div>

      </div>
      }

      </div>
    );

};

export default About;
