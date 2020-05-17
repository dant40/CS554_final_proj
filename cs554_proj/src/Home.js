import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import TopBar from "./TopBar";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
function Home(props){
    const [user,setUser] = useState(props.user)
    const [show,setShow] = useState(false)
    const [flag, setFlag] = useState(false)
    const [googleFlag, setGoogleFlag] = useState(false)
    const [newUsername,setNewUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [image, setImage] = useState(null);

    async function handleSubmit(e){
        let bod = {"username": "jason", "score": 2};
        e.preventDefault();
        //let bod = {"username": user.username, "image": }
        const response = await fetch("http://localhost:3001/api/uploadNewPhoto", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(image)
        });  
    }
    const onChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0]);
        console.log(typeof image);
      }

    function handleLogout(e){
        e.preventDefault();
        try{
            localStorage.removeItem('username');
            location.reload(true)
        }catch(e){

        }

    }

    function handleChangeUsername(){
        if(user.password != ""){
            setShow(true)
            setFlag(true)
        }
        else {
            setGoogleFlag(true)
        }

    }

    function handleChangePassword(){
        if(user.password != ""){
            setShow(true)
            setFlag(false)
        }
        else {
            setGoogleFlag(true)
        }

    }

    function handleClose(){
        setShow(false)
    }

    async function handleModal(e,url){
        e.preventDefault();
        if(url === "changeUsername"){
            if(newUsername !== "" && password !== ""){
                let bod= {"username": user.username,"newUsername": newUsername , "password": password}
                const response = await fetch("http://localhost:3001/api/"+url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(bod)
                })
                const js = await response.json();
                localStorage.setItem("username",newUsername);
                setUser(js)
                location.reload(true)
            }
        }
        else if(url === "changePassword"){
            if(newUsername !== "" && password !== ""){
                let bod= {"username": user.username,"newPassword": newPassword , "password": password}
                const response = await fetch("http://localhost:3001/api/"+url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(bod)
                })
                const js = await response.json();
        }
        
        }
    }

    function createModalBody(){
        if(googleFlag){
            return(
                <div>
                    <p>Sorry, you can't change google credentials here.</p>
                    <p>Please change your credentials through their channels.</p>
                </div>
            )
        }
        else if(flag){
            return(
                <Form>
                    <Form.Group>
                        <Form.Label>New Username</Form.Label>
                        <Form.Control 
                        placeholder = "Enter a new username" 
                        onChange={(e) => setNewUsername(e.target.value) } 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) }  />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick = {(e) => handleModal(e,"changeUsername")}>
                            Change
                    </Button>
                </Form>
            )
        }
        else if(!flag){
            <Form>
                <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                    placeholder = "Enter a new password" 
                    onChange={(e) => setNewPassword(e.target.value) } 
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter old Password" onChange={(e) => setPassword(e.target.value) }  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick = {(e) => handleModal(e,"changePassword")}>
                        Change
                </Button>
            </Form>
        }
    }

    return(
        <div>
            <TopBar></TopBar>
            <h1 style={{marginTop: "150px"}}>Welcome {props.user.username}</h1>

            <form onSubmit={async(e) => handleSubmit(e)} onChange = {onChange}> 
			   <input type="file" name="image" accept="image/*" required/>
			   <input type="submit" value="Upload a file"/>
			</form>

            <Button variant ="secondary" onClick = {() => handleChangeUsername()}>Change Username</Button>
            <Button variant ="secondary" onClick = {() => handleChangePassword()}>Change Password</Button>
            <Button variant ="secondary" onClick = {(e) => handleLogout(e)}>Logout</Button>
            <Modal scrollable show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {createModalBody()}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    
}


export default Home