import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import Details from './views/Details/Details'
import NavBar from './components/Navbar/Navbar'
import  Search from './components/Search/Search'
import CreateGame from './views/CreateGame/CreateGame'

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <NavBar/>}
    <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/videogame/:id' element={<Details />} />
        <Route path="/videogames/:name" element={<Search />} />
        <Route path="/creategame" element={<CreateGame />} />

    </Routes>
    </div>
  )
}

export default App
