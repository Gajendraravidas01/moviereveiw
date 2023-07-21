import React, { useState } from "react";
import Header from "./Components/Header";
import './App.css'
import Card from "./Components/Card";
import { Route, Routes } from "react-router-dom";
import Addmovie from "./Components/Addmovie";
import Detail from "./Components/Detail";
import { createContext } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const Appstate = createContext(); 

function App() {
  const[login ,setLogin] = useState(false);
  const[username,setuserName] = useState("");

  return (
    <Appstate.Provider value={{username,login,setuserName,setLogin}}>
      <div className="App relative" >
        <Header/>
          <Routes>
            <Route path="/" element={<Card/>} />
            <Route path="/addmovie" element={<Addmovie/>} />
            <Route path="/detail/:id" element={<Detail/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export  {Appstate}