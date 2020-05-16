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
// const friends = [{
//     _id: "1",
//     username: "SafariDan",
//     email: "s@s",
//     profilePic: "",
//     friendsList: []
// }, {
//     _id: "2",
//     username: "Myon",
//     email: "m@m",
//     profilePic: "",
//     friendsList: []
// }]



function Friends(props){
    const [friendList,setFriendList] = useState([]);
    const [chatUID,setChatUID] = useState("")
    const [show, setShow] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        //need to do a db call here to get friends list
        //will harcode a few friends for now.
        //const ls = accounts.get(props.user.username)
        setFriendList(props.user.friends)
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
    async function searchUsers(e,searchTerm){
        //console.log(searchTerm)
        e.preventDefault();
        let bod= {"searchTerm": searchTerm}
        const response = await fetch("http://localhost:3001/api/getSearch",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bod)
        })
        const searchRes = await response.json();
        setSearchResults(searchRes);

    }

    async function addFriend(e,name){
        e.preventDefault();
        let bod= {"username": props.user.username, "friendName": name}
        const response = await fetch("http://localhost:3001/api/addFriend",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bod)
        })
        const updatedUser = await response.json();
        setFriendList(updatedUser.friends)
    }

    async function removeFriend(e, name){
         e.preventDefault();
         let bod= {"username": props.user.username, "friendName": name}
        const response = await fetch("http://localhost:3001/api/removeFriend",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bod)
        })
        const updatedUser = await response.json();
        setFriendList(updatedUser.friends)
         
    }

    function createSearchResults(){
        try{
            return( 
                <Container>
                    <h2>Search Results</h2>
                    { searchResults.map( (item) => {
                        return( 
                            <Row key = {item.username}>
                                <div  className="friend-row">
                                <Col><div><img className= "profile" src ="http://www.barbalace.it/antonio/photos/abarbala.jpeg" /></div></Col>
                                <Col><div><p className = "uname">{item.username}</p></div></Col>
                                <Col><div ><Button onClick = {(e) => addFriend(e,item.username)} variant = "secondary">Add</Button></div></Col>
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

    function createFriendsList(){
        try{
        return( 
            <Container>
                <h1>My Friends</h1>
                { friendList.map( (item) => {
                    return( 
                        <Row key = {item.username}>
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
                        onChange={(e) => searchUsers(e,e.target.value)}
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