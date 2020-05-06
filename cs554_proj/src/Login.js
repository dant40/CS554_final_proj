import React, {useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import fb  from './firebase';
import firebase from "firebase/app";
import "firebase/auth";

function Login(){
    const [user,setUser] = useState(null);

    function handleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            firebase.auth().signInWithPopup(provider).then(result => setUser(result))
        }catch(e){
            console.log(e)
        }
    }

    function showUser(){
        if(user){
        return <p>{user.user.email}</p>
        }
        else return <p>nothin</p>
    }

    return(
        <div>
            <Button variant="primary"  onClick={() => handleSignIn()}>Sign-in with Google</Button>
            {showUser()}
        </div>
    )

}

export default Login