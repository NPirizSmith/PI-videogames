import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css"

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
              />
              <NavLink to={`/videogames/${searchTerm}`}>
                <button type="submit">Search</button>
              </NavLink>
            </form>
        
          <div className="home">
            <Link className={style.home} to="/home">
              <h3>Home</h3>
            </Link>
          </div>
          <div className={style.create}>
            <Link to="/creategame">
              <h3>Create</h3>
            </Link>
          </div>
        </div>
      );
    }

export default NavBar;
