import React, { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form } from 'react-bootstrap'
import TopBar from "./TopBar"
import './Friends.css';
import ChatGUI from "./chatStuff/ChatGUI"
//import * as accounts from "./mongo/accounts";
//these ids will be used for our comet chat ids too
const friends = [{
    _id: "1",
    username: "SafariDan",
    email: "s@s",
    profilePic: "",
    friendsList: []
}, {
    _id: "2",
    username: "Myon",
    email: "m@m",
    profilePic: "",
    friendsList: []
}]



function Friends(props){
    const [friendList,setFriendList] = useState([]);
    const [chatUID,setChatUID] = useState("")
    const [show, setShow] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        //need to do a db call here to get friends list
        //will harcode a few friends for now.
        //const ls = accounts.get(props.user.username)
        setFriendList(friends)
    },[friendList])

    function handleClose(){ 
        setChatUID("");
        setShow(false);
    }
    function handleShow(uid){ 
        //this uid used here should be in the state
        //the one passed in corresponds to whom were trying to chat with
        //I also need to pass the current users uid to do login
        setShow(true);
    }

    //will be used as the way to add friends 
    //can search by username, obviously will need db stuff here too
    function searchUsers(value){
        //make a getAllUsers function in db
        //setSearchResults(response)
    }

    function addFriend(username){
        //const acc = accounts.addFriend(prop.user.username)
        //setFriendList(acc.friends)
    }

    function removeFriend(e, name){
        //make a remove friend function in accounts
         //setFriendList(acc.friends)
    }

    function createSearchResults(){
        
    }

    function createFriendsList(){
        try{
        return( 
            <Container>
                <h1>My Friends</h1>
                { friendList.map( (item) => {
                    return( 
                        <Row key = {item._id}>
                            <div  className="friend-row">
                            <Col><div><img className= "profile" src ="http://www.barbalace.it/antonio/photos/abarbala.jpeg" /></div></Col>
                            <Col><div><p className = "uname">{item.username}</p></div></Col>
                            <Col><div ><Button onClick = {(e) => removeFriend(e,item.username)} variant = "danger">Remove</Button></div></Col>
                            </div>
                        </Row>
                        );
                    })
                }
            </Container> 
            
            )
    }catch(e){
        return
    }
    }

    return(
        <div>
            <TopBar></TopBar>

            {createFriendsList()}
            <div>
                <Form>
                    <Form.Group>
                    <Form.Control
                    placeholder = "Enter a username to search"
                    onChange={(e) => searchUsers(e.target.value)}
                    />
                    </Form.Group>
                </Form>
                {createSearchResults()}
            </div>
            <div><Button onClick = {() => handleShow()} variant = "primary" size="lg">Open Global Chat</Button></div>
            {/* chat logic will all go inside this modal */}
            <Modal scrollable show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <ChatGUI senderID = {props.user.username}></ChatGUI>
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


export default Friends