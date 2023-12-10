import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css"
import searchicon from "../../assets/searchicon.png"
// import { getAllGames } from "../../Redux/Actions/actions";


function NavBar() {



    const [searchTerm, setSearchTerm] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        setSearchTerm("");
      }


      return (
        <div className={style.nav}>
          <Link className={style.landing} to="/">
            <h3>Landing</h3>
          </Link>
            <form className={style.search} onSubmit={(event) => handleSubmit(event)}>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                type="text"
                placeholder="Search videogames..."
                className={style.input}
              />
              <NavLink to={`/videogames/${searchTerm}`}>
               <img type="submit" src={searchicon} className={style.searchIcon}></img>
              </NavLink>
            </form>
        
          <div className="home">
            <Link 
            className={style.home} 
            to="/home"
            >
            
              <h3>Home</h3>
            </Link>
          </div>
          <div >
            <Link className={style.create} to="/creategame">
              <h3>Create</h3>
            </Link>
          </div>
        </div>
      );
    }

export default NavBar;
