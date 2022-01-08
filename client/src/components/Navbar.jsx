import React, {useContext} from "react";
 import { Link,useHistory } from 'react-router-dom';
import BNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';

//when we are authenticated display the NavDropdown and logout and
//we want to take off sign up or login


function Navbar() {

//we need to grab our authcontext info and be able to destructure it
/////////////import useContext
const {isAuthenticated,setIsAuthenticated,setUser}=useContext(AuthContext)

// the history object can be used to navigate to different links
//,or endpoints, and many more.
const history= useHistory();

let onClickLogoutHandler = ()=>{
  AuthService.logOut().then(data=>{
    if(data.success){
      setUser(data.user);
      setIsAuthenticated(false);
      history.push('/');
    }
  })
}

const unAuthenticatedNavBar= ()=>{
  return(
  <>
    <Nav className="mr-auto">
      <Nav.Link style={{color:"white"}}  as={Link} to="/" > Home </Nav.Link>
      <Nav.Link style={{color:"white"}}  as={Link} to="/login" >Login</Nav.Link>
      <Nav.Link style={{color:"white"}}  as={Link} to="/register" >Register</Nav.Link>
    </Nav>
  </>
      )
}

const authenticatedNavBar = ()=>{
return(
<>

  <Nav.Link style={{color:"white"}} as={Link} to="/">Home</Nav.Link>

  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
    <NavDropdown.Item style={blackText} as={Link} to="/BadHand">1. Bad Hand</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/Mirror">2. The Accountability Mirror</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/Calloused">3. Calloused Mind</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/TakingSouls">4. Taking Souls</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/ArmoredMind">5. Armored Mind</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/CookieJar">6. The Cookie Jar</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/PercentRule">7. The 40 Percent Rule</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/Schedule">8. Schedule</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/Uncommon" >9. Become Uncommon Amongst the Uncommon</NavDropdown.Item>
    <NavDropdown.Item style={blackText} as={Link} to="/EmpowermentFailure">10. Empowerment of Failure</NavDropdown.Item>
  </NavDropdown>
  <button onClick={onClickLogoutHandler}>Logout</button>
</>
)
}
//we need to make a function that for unauth and for auth that returns
// html of nav links in our navbar

const blackText={
  color:"#1d2124"
}

  return (

    <BNavbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <BNavbar.Brand  style={{color:"white"}} as={Link} to="/">Can't Hurt Me Challenges</BNavbar.Brand>
      <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BNavbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {!isAuthenticated? unAuthenticatedNavBar(): authenticatedNavBar()}
        </Nav>
      </BNavbar.Collapse>
    </BNavbar>

  );
}



export default Navbar;
