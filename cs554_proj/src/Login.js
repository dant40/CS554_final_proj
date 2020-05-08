import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import fb  from './firebase';
import firebase from "firebase/app";
import "firebase/auth";
//import {Redirect } from "react-router-dom";
function Login(props){

    // useEffect(() => {
    //     console.log(props)
    // })

    function handleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            firebase.auth().signInWithPopup(provider).then(result => props.onLogin(result.user))
        }catch(e){
            console.log(e)
        }
        
    }

    return(
        <div>
            <Button variant="primary"  onClick={() => handleSignIn()}>Sign-in with Google</Button>
        </div>
    )

}

export default Login