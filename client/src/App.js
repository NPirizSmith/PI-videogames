import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from './Views/Landingpage/Landingpage';
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import CreateGame from "./Views/CreateGame/CreateGame";
import Navbar from "./components/Navbar/Navbar";
// import About from "./elements/About/About";
// import Error from "./elements/Error/Error";


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/creategame" element={<CreateGame/>} />
          <Route path='/videogame:id' element={<Detail/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;