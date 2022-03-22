import React, {useContext,useState} from "react";
 import { Link,useHistory } from 'react-router-dom';
import BNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import Container from 'react-bootstrap/Container';
import {FaUserCheck} from 'react-icons/fa';


function Navbar() {

const {isAuthenticated,setIsAuthenticated,setUser,user}=useContext(AuthContext)

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
      <Nav.Link style={{color:"white"}}  as={Link} href='#Home' to="/" > Home </Nav.Link>
      <Nav.Link style={{color:"white"}}  as={Link} href='#login' to="/login" >Login</Nav.Link>
      <Nav.Link style={{color:"white"}}  as={Link} href='#register' to="/register" >Register</Nav.Link>
    </Nav>
  </>
      )
}

const authenticatedNavBar = ()=>{

  function authCheck(){

    AuthService.isAuthenticated().then(data=>{
      if(!data.isAuthenticated){
        setIsAuthenticated(false);
        setUser({username:""});
      }
    })
  }

return(
<>

  <Nav className="mr-auto">
    <Nav.Link style={{color:"white"}} as={Link} href='#Home' to="/">Home</Nav.Link>

    <NavDropdown title="Challenges" id="collasible-nav-dropdown">
      <NavDropdown.Item onClick={authCheck} style={blackText} as={Link} href='#BadHand' to="/BadHand">1. Bad Hand</NavDropdown.Item>
      <NavDropdown.Item onClick={authCheck} style={blackText} as={Link} href='#Mirror' to="/Mirror">2. The Accountability Mirror</NavDropdown.Item>
      <NavDropdown.Item onClick={authCheck}  style={blackText} as={Link} href='#Calloused' to="/Calloused">3. Calloused Mind</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#TakingSouls' to="/TakingSouls">4. Taking Souls</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#ArmoredMind' to="/ArmoredMind">5. Armored Mind</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#CookieJar' to="/CookieJar">6. The Cookie Jar</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#PercentRule' to="/PercentRule">7. The 40 Percent Rule</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#Schedule' to="/Schedule">8. Schedule</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#Uncommon' to="/Uncommon" >9. Uncommon Amongst the Uncommon</NavDropdown.Item>
      <NavDropdown.Item  onClick={authCheck} style={blackText} as={Link} href='#EmpFail' to="/EmpowermentFailure">10. Empowerment of Failure</NavDropdown.Item>
    </NavDropdown>
  </Nav>
  <Nav className="justify-content-end">
    <BNavbar.Text style={{marginRight:"20px"}}>
      <FaUserCheck/> {user.username}
    </BNavbar.Text>
    <button className='btn btn-light' style={{margin:"0 20px 0 0"}} onClick={onClickLogoutHandler}>Logout</button>
  </Nav>

</>
)
}

const blackText={
  color:"#1d2124"
}

  return (

    <BNavbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <BNavbar.Brand  style={{color:"white"}} as={Link} to="/">Can't Hurt Me Challenges</BNavbar.Brand>
      <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BNavbar.Collapse id="responsive-navbar-nav">

        {!isAuthenticated? unAuthenticatedNavBar(): authenticatedNavBar()}

      </BNavbar.Collapse>
    </BNavbar>

  );
}



export default Navbar;
