import React, { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TopBar from "./TopBar"
import './Friends.css';
import ChatGUI from "./chatStuff/ChatGUI"
//these ids will be used for our comet chat ids too
const friends = [{
    _id: "1",
    username: "SafariDan",
    profilePic: ""
}, {
    _id: "2",
    username: "Myon",
    profilePic: ""
}]



function Friends(props){
    const [friendList,setFriendList] = useState([]);
    const [chatUID,setChatUID] = useState("")
    const [show, setShow] = useState(false);
    useEffect(() => {
        //need to do a db call here to get friends list
        //will harcode a few friends for now.
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
    function searchFriends(){

    }

    function removeFriend(e, id){
        //this will need a db call
        //should work by updating the state to reflect the removal, then pushing change to db
    }

    function createFriendsList(){
        try{
        return( <Container>
                <h1>My Friends</h1>
            { friendList.map( (item) => {
                    return( 
                        <Row key = {item._id}>
                            <div  className="friend-row">
                            <Col><div><img className= "profile" src ="http://www.barbalace.it/antonio/photos/abarbala.jpeg" /></div></Col>
                            <Col><div><p className = "uname">{item.username}</p></div></Col>
                            <Col><div ><Button onClick = {(e) => removeFriend(e,item._id)} variant = "danger">Remove</Button></div></Col>
                            </div>
                        </Row>
                        );
                })
            }
            </Container> )
    }catch(e){
        return
    }
    }

    return(
        <div>
            <TopBar></TopBar>
            
            {createFriendsList()}
            <div><Button onClick = {() => handleShow()} variant = "primary">Open Global Chat</Button></div>
            {/* chat logic will all go inside this modal */}
            <Modal scrollable show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <ChatGUI senderID = "tester1"></ChatGUI>
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