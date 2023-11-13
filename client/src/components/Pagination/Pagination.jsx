import React from "react";

export default function Paginado({gamesPerPage, allGames, pagination}){
    const pages = []

    for(let i=0; i<=Math.ceil(allGames/gamesPerPage); i++){
        
        pages.push(i+1)

    }
    return(
        <nav>
            <ul>
                {
                    pages?.map(pNumber=>(
                        <li key={pNumber}>
                            <a onClick={()=>pagination(pNumber)}>{pNumber}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}