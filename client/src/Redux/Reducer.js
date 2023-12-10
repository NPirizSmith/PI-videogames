import {
  GET_ALL_GAMES,
  GET_GAME_BY_ID,
  SEARCH_GAME_BY_NAME,
  GET_GENRES,
  PAGINATION,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
  SORT_AZ,
  CLEAR_DETAIL,
  RESET
  
} from "./Actions/action-types";

let initialState = {
  videogames: [],
  fullVideogames: [],
  gameById: [],
  genres: [],
  filtered: [],
  allPlatforms: [],
  currentPage: 0,
  filters: false,
};

const rootReducer = (state = initialState, action) => {
  const cardsPerPage = 20;
  switch (action.type) {
    case GET_ALL_GAMES:

    const gamePlatforms = new Set();

    action.payload.forEach(game =>{
      if (Number.isInteger(game.id)){
        game.platforms.forEach((platforms)=>{
          if(platforms.platform.name){
            gamePlatforms.add(platforms.platform.name)  
          }
        })
      }
    })  
 
    if(state.filtered.length===0){
   
    return {
      ...state,
        videogames: [...action.payload].splice(0, cardsPerPage),
        fullVideogames: [...action.payload],
        // filtered: [],
        filters: false,  
        allPlatforms: [...gamePlatforms]
    };
    }
      return {
        
        ...state,
        videogames: [...state.filtered].splice(0, cardsPerPage),
        fullVideogames: [...action.payload],
        // filtered: [],
        filters: false,  
        allPlatforms: [...gamePlatforms]
        
      };
      
    case PAGINATION:
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;
      const firstIndex =
        action.payload === "next"
          ? nextPage * cardsPerPage
          : prevPage * cardsPerPage;

      if (state.filters) {
        if (action.payload === "next" && firstIndex >= state.filtered.length)
          return state;
        else if (action.payload === "prev" && firstIndex < 0) return state;
        return {
          ...state,
          videogames: [...state.filtered].splice(firstIndex, cardsPerPage),
          currentPage: action.payload === "next" ? nextPage : prevPage,
        };
      }

      if (
        action.payload === "next" &&
        firstIndex >= state.fullVideogames.length
      )
        return state;
      if (action.payload === "prev" && prevPage < 0) return state;
      return {
        ...state,
        videogames: [...state.fullVideogames].splice(firstIndex, cardsPerPage),
        currentPage: action.payload === "next" ? nextPage : prevPage,
      };


    case GET_GAME_BY_ID:
      return {
        ...state,
        gameById: action.payload,
      };

      case CLEAR_DETAIL:
        return{...state,
          gameById: []
        }


    case SEARCH_GAME_BY_NAME:
      return {
        ...state,
        filtered: action.payload,
        filter: true,
      };

      case RESET:
        return {
          ...state, videogames:[...state.fullVideogames].splice(0, cardsPerPage),
          filtered: [],
          filters: false,
          currentPage: 0
        }

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };


    case FILTER_BY_GENRE:
      if (action.payload === "all") {
        return {
          ...state,
          videogames: [...state.fullVideogames].splice(0, cardsPerPage),
          filtered: [],
          filters: true,
        };
      }
    
      return {
        ...state,
        videogames: [...state.fullVideogames]
          .filter((videogame) => videogame.genres.includes(action.payload))
          .splice(0, cardsPerPage),
        filtered: [...state.fullVideogames].filter((videogame) =>
          videogame.genres.includes(action.payload)
        ),
        filters: true,
      };


  case FILTER_BY_RATING:
  let filteredGamesByRating = [...state.filtered];

  if (state.filters) {
    filteredGamesByRating = [...state.filtered];
  }

  filteredGamesByRating.sort((a, b) => {
    if (action.payload === "desc") {
      return a.rating - b.rating;
    } else if (action.payload === "asc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return {
    ...state,
    videogames: filteredGamesByRating.slice(0, cardsPerPage),
    filtered: filteredGamesByRating,
    filters: true,
  };
  case SORT_AZ:
  let sortedGames = [...state.filtered];

  if (state.filters) {
    sortedGames = [...state.filtered];
  }

  sortedGames.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (action.payload === 'asc') {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else if (action.payload === 'desc') {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }
    return 0;
  });
  

  return {
    ...state,
    videogames: sortedGames.slice(0, cardsPerPage),
    filtered: sortedGames,
    filters: true,
  };

    default:
      return {
        ...state,
      };
  }
  
};



export default rootReducer;
