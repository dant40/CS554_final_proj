import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form } from 'react-bootstrap'
import firebase from "firebase/app";
import "firebase/auth";
import Modal from 'react-bootstrap/Modal';
import * as accounts from "./mongo/accounts";
//import {Redirect } from "react-router-dom";
function Login(props){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [show,setShow] = useState(false);
    // useEffect(() => {
    //     console.log(props)
    // })

    function handleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            firebase.auth().signInWithPopup(provider).then(result =>
                { 
                    props.onLogin(result.user); 
                    //const acc =accounts.createFromGoogleLogin(result.user.displayName)
                    //props.onLogin(acc)
                })
        }catch(e){
            console.log(e)
        }
        
    }

    function handleNormalSignIn(){
        //const acc = accounts.create(username,password)
        //props.onLogin(acc)
    }

    function createForm(){
        return(
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    placeholder = "username" 
                    onChange={(e) => setUsername(e.target.value) } 
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) }  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick = {() => handleNormalSignIn()}>
                        Login
                </Button>
            </Form>
        )
    }
    
    return(
        <div>
            <h1>Login</h1>
            <div>
               {createForm()}
            </div>
            <Button variant= "secondary" onClick = {() => setShow(true)}>Click here to sign up!</Button>
            <Button variant="primary"  onClick={() => handleSignIn()}>Sign-in with Google</Button>
            
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  {createForm()}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Login