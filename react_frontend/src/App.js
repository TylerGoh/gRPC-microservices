import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import axios from 'axios';
import {useState} from 'react'

function App() {
  //Didn't have time to implement sessionIDs
  //So I'm using useStates to store login details as global variables
  //This makes debugging easy as refreshing clears the states
  const [usernameGlobal, setUsernameGlobal] = useState("")
  const [passwordGlobal, setPasswordGlobal] = useState("")
  axios.defaults.baseURL = process.env.REACT_APP_PROXY_URL;
  return (
    <div className="App">
      <NavigationBar usernameGlobal={usernameGlobal} setUsernameGlobal={setUsernameGlobal}/>
      <Routes>
        <Route exact path="/login" element={<Login 
                                              setUsernameGlobal={setUsernameGlobal} 
                                              setPasswordGlobal={setPasswordGlobal}
                                              usernameGlobal={usernameGlobal}/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/" element = {<Home
                                          usernameGlobal={usernameGlobal} 
                                          passwordGlobal={passwordGlobal}/>}/>
      </Routes>
    </div>
  );
}

export default App;