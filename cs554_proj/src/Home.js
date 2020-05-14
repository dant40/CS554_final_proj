import React, { useState } from 'react';
import TopBar from "./TopBar"
function Home(props){

    return(
        <div>
            <TopBar></TopBar>
            <h1 style={{marginTop: "150px"}}>Welcome {props.user.displayName}</h1>
        </div>
    )
    
}


export default Home