import React, { useState } from 'react';
import TopBar from "./TopBar"
function Home(props){

    return(
        <div>
            <TopBar></TopBar>
            <h1 style={{marginTop: "150px"}}>Welcome {props.user.username}</h1>
            <form action="/api/uploadNewPhoto" enctype="multipart/form-data" method="POST"> 
			   <input type="file" name="image" accept="image/*" required/>
			   <input type="submit" value="Upload a file"/>
			</form>
        </div>
    )
    
}


export default Home