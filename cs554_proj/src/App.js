import React, { useState } from 'react';
//import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Login from "./Login"
import Home from "./Home"
import GameDev from "./GameDev"
import Friends from "./Friends"
function App() {
    
  const [user,setUser] = useState(null);
  return (
      <div className="App">
        <Router>
          <div>
            <nav>
              {/* <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
              </ul> */}
            </nav>
            <Switch>
            <Route exact path="/">
              {(user !== null) ? <Home user = {user}/> : <Login onLogin = {setUser}/>}
            </Route>
            <Route exact path="/friends">
            {(user !== null) ? <Friends user = {user}/> : <Redirect to ="/"/> }
            </Route>
            <Route exact path="/game">
              <GameDev></GameDev>
            </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  
    // function Home() {
    //   return (
    //     <div>
    //       <h2>Welcome {user.email}</h2>
    //     </div>
    //   );
    // }

}



export default App;
