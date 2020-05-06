import React from 'react';
import Button from 'react-bootstrap/Button';
import signInWithGoogle from './firebase';
function Login(){

    

    return(
        <div>
            <Button variant="primary" onClick={signInWithGoogle}>Sign-in with Google</Button>
            <p></p>
        </div>
    )

}

export default Login