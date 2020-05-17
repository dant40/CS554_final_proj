import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form } from 'react-bootstrap'
import firebase from "firebase/app";
import "firebase/auth";
import Modal from 'react-bootstrap/Modal';

//import {Redirect } from "react-router-dom";
function Login(props){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [show,setShow] = useState(false);
    // useEffect(() => {
    //     console.log(props)
    // })

   async function handleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            firebase.auth().signInWithPopup(provider).then(async (result) =>
                { 
                    let bod= {"username": result.displayName}
                    const response = await fetch("http://localhost:3001/api/create",{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify(bod)
                    })
                    const js = await response.json();
                    //console.log(js)
                    if(js.username){
                        window.localStorage.setItem("username", js.username)
                        props.onLogin(js); 
                    }

                    //const acc =accounts.createFromGoogleLogin(result.user.displayName)
                    //props.onLogin(acc)
                })
        }catch(e){
            console.log(e)
        }
        
    }

    async function handleNormalSignIn(e){
        e.preventDefault();
        if(username !== "" && password !== ""){
            let bod= {"username": username, "password": password}
            const response = await fetch("http://localhost:3001/api/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(bod)
            })
            const js = await response.json();
            //console.log(js)
            if(js.username){
                window.localStorage.setItem("username", js.username)
                props.onLogin(js); 
            }
        }
    }

    async function handleNormalCreate(e){
        //const acc = accounts.create(username,password)
        //props.onLogin(acc)
        e.preventDefault();
        if(username !== "" && password !== ""){
            let bod= {"username": username, "password": password}
            const response = await fetch("http://localhost:3001/api/create",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(bod)
            })
            const js = await response.json();
            //console.log(js)
            if(js.username){
                window.localStorage.setItem("username", js.username)
                props.onLogin(js); 
            }
        }
    }

    function createForm(flag){
        if(flag){
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
                    <Button variant="primary" type="submit" onClick = {(e) => handleNormalCreate(e)}>
                            Login
                    </Button>
                </Form>
            )
        }
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
                <Button variant="primary" type="submit" onClick = {(e) => handleNormalSignIn(e)}>
                        Login
                </Button>
            </Form>
        )
    }
    
    return(
        <div>
            <h1>Login</h1>
            <div>
               {createForm(false)}
            </div>
            <Button variant= "secondary" onClick = {() => setShow(true)}>Click here to sign up!</Button>
            <Button variant="primary"  onClick={() => handleSignIn()}>Sign-in with Google</Button>
            
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  {createForm(true)}
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