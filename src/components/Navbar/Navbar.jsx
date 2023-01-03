import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'

const NavbarC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" shadow-md>
        <Container>
        
          
           <Navbar.Brand to="/">
              MERN User
           </Navbar.Brand>
            
         
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarC