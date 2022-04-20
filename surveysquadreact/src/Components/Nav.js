import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import firebase from "../config";
import "../CSS/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav(){
//nav component
return(
  <div>
 <ReactBootStrap.Navbar bg="danger" expand="xl">
  <ReactBootStrap.Container>
    <ReactBootStrap.Navbar.Brand className="blahblah" href="/">Survey Squad</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
      <ReactBootStrap.Nav className="me-auto">
        <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="/surveyCreator">Create Survey</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href={`/mySurveys`}>My Surveys</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="/accountsPage">Users</ReactBootStrap.Nav.Link>
        <button onClick={() => firebase.auth().signOut() && window.location.replace("/login")}>Sign Out</button>
      </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Container>
</ReactBootStrap.Navbar> 
</div>
);

}
export default Nav;