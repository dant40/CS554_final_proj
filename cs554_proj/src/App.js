import React, { useState } from 'react';
//import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import Login from "./Login"
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
              {(user !== null) ? <Home/> : <Login onLogin = {setUser}/>}
            </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  
    function Home() {
      return (
        <div>
          <h2>Welcome {user.email}</h2>
        </div>
      );
    }

}



export default App;
