import React, { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TopBar from "./TopBar"
import './Friends.css';
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
    
    useEffect(() => {
        //need to do a db call here to get friends list
        //will harcode a few friends for now.
        setFriendList(friends)
    },[friendList])

    function removeFriend(e, id){

    }

    function createFriendsList(){
        try{
        return( <Container>
                <h1>My Friends</h1>
            { friendList.map( (item) => {
                    return( 
                        <Row>
                            <div key = {item._id} className="friend-row">
                            <Col><div><img className= "profile" src ="http://www.barbalace.it/antonio/photos/abarbala.jpeg" /></div></Col>
                            <Col><div><p className = "uname">{item.username}</p></div></Col>
                            <Col><div><Button variant = "primary">Chat</Button></div></Col>
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
        </div>
    )

}


export default Friends