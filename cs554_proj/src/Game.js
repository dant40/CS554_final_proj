import React, { useState } from 'react';
import GameDev from './GameDev'
import TopBar from "./TopBar"

function Game(){
    return(
        <div>
            <TopBar></TopBar>
            <iframe src = "/game">
            </iframe>
        </div>
    )
}
export default Game;