import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar(props){
    let loginLink;
    let navigate = useNavigate()
    const logout = ()=>{
        props.setUsernameGlobal("")
        navigate("/login");
    }

    if(props.usernameGlobal === "")
        loginLink = <Nav.Link as={Link} to="/login">Login</Nav.Link>
    else
        loginLink = <Nav.Link onClick={logout}>Logout {props.usernameGlobal}</Nav.Link>
    

    return(
        <Navbar bg="light">
            <Nav className='me-auto'>
                <Nav.Link as={Link} to="/">Sentiment Analysis</Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
                {loginLink}
            </Nav>
        </Navbar>
    )
}

export default NavigationBar