
import { GET_ALL_GAMES} from "../Actions/action-types"

let initialState = {
    videogames: [],
    gameDetail: [],
    genres: [],
    currentPage: 0,

};

const rootReducer = (state = initialState, action) => {
    // const ITEMS_PER_PAGE = 15;
    switch (action.type) { 
        case GET_ALL_GAMES:
    return {
        ...state, videogames: action.payload
    }
        // case GET_GAME_DETAIL: 
        // return {
        //     ...state,
        //     gameDetail: action.payload
        // }

        // case CREATE_GAME: 
        //     const newGame = action.payload
        //     const gameCreate = [...state.games, newGame]
        //     return {
        //         ...state, games: gameCreate
        //     }
        
        // case DELETE_GAME:
        //     const idGameDelete = action.payload
        //     const gameDelete = state.games.filter((gameDetail)=> gameDetail.id !== Number(idGameDelete))
        //     return {
        //         ...state,
        //         games: gameDelete
        //     }
        // case GET_GAME_GENRES:
        //     return {
        //             ...state,
        //             genres: action.payload
        //         }
        // case SEARCH_GAME:
        //     return {
        //         ...state,
        //         games: action.payload
        //     }





    default: return {
        ...state
    }    
    }
    
};

export default rootReducer;
