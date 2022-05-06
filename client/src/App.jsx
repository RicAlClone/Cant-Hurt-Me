import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import BadHand from "./components/hand/BadHand";
import Mirror from "./components/mirror/Mirror";
import Calloused from "./components/Calloused-Mind/Calloused";
import TakingSouls from "./components/Taking-Souls/TakingSouls";
import ArmoredMind from "./components/ArmoredMind/ArmoredMind";
import CookieJar from "./components/CookieJar/CookieJar";
import PercentRule from "./components/FortyPercentRule/PercentRule";
import Schedule from "./components/Scheduling/Schedule";
import Uncommon from "./components/Uncommon/Uncommon";
import EmpowermentFailure from "./components/FinalChallenge/EmpowermentFailure";
import Login from "./components/Login";
import Register from "./components/Register";
import DailyInstructions from "./components/DailyInstructions";
import PrivateRoute from "./Hocs/PrivateRoute";
import UnPrivateRoute from "./Hocs/UnPrivateRoute";
// import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return(

  <Router>
    <Navbar/>
    <Route exact path="/" component={About}></Route>

    {/* <UnPrivateRoute exact path="/" component={About}></UnPrivateRoute> */}
    <UnPrivateRoute path="/Register" component={Register}></UnPrivateRoute>
    <UnPrivateRoute path="/Login" component={Login}></UnPrivateRoute>
    <PrivateRoute path="/DailyInstructions" roles={['user']} component={DailyInstructions}></PrivateRoute>
    <PrivateRoute path="/BadHand" roles={['user']} component={BadHand}></PrivateRoute>
    <PrivateRoute  path="/Mirror" roles={['user']} component={Mirror}></PrivateRoute>
    <PrivateRoute  path="/Calloused" roles={['user']} component={Calloused}></PrivateRoute>
    <PrivateRoute  path="/TakingSouls" roles={['user']} component={TakingSouls}></PrivateRoute>
    <PrivateRoute  path="/ArmoredMind" roles={['user']} component={ArmoredMind}></PrivateRoute>
    <PrivateRoute  path="/CookieJar" roles={['user']} component={CookieJar}></PrivateRoute>
    <PrivateRoute  path="/PercentRule" roles={['user']} component={PercentRule}></PrivateRoute>
    <PrivateRoute  path="/Schedule" roles={['user']} component={Schedule}></PrivateRoute>
    <PrivateRoute  path="/Uncommon" roles={['user']} component={Uncommon}></PrivateRoute>
    <PrivateRoute  path="/EmpowermentFailure" roles={['user']} component={EmpowermentFailure}></PrivateRoute>

  </Router>
);
}



export default App;
