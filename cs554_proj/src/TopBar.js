
import React, { useState } from 'react';
import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link
  } from "react-router-dom";

function TopBar(){
    return(<Navbar className="justify-content-center" fixed="top" bg="dark" variant="dark">
      <NavItem className="navListItem">
        <Nav.Link as={Link} to="/" > 
          Home
        </Nav.Link>
      </NavItem>
      <NavItem className="navListItem">
        <Nav.Link as={Link} to="/friends" >
          Friends
        </Nav.Link>
      </NavItem>
    </Navbar>)
}
export default TopBar