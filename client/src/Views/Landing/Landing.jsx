import { Link } from "react-router-dom"
import style from "./Landing.module.css"

function Landing() {
  return (
   
     <div className={style.landingContainer}>
        <div className={style.titleContainer}>
          <h1>Videogame database aplication</h1>
        </div>
        <div className={style.subtitleContainer}>
          <h3>Welcome! This is a Single Page Application that will allow you to search for games in a large database and also add your own games...</h3>
        </div>
        <Link to="/Home">
            <button className={style.buttonHome}>Start</button>
        </Link>
    </div>
  )
}

export default Landing