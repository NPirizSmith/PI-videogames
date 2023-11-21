import axios from "axios";
import { GET_ALL_GAMES, GET_GAME_BY_ID, SEARCH_GAME_BY_NAME, GET_GENRES, PAGINATION, FILTER_BY_GENRE, FILTER_BY_RATING, SORT_AZ} from "./action-types"

export const getAllGames = () => {
    return async function (dispatch){
     try {
         const {data} = await axios.get("http://localhost:3001/videogames")  
         console.log(data)         
         dispatch({
           type: GET_ALL_GAMES,
           payload: data
         })
     } catch (error) {console.log(error)}} };

     export const getGamesById = (id) => {
      return async function (dispatch) {
        try {
          const { data } = await axios.get(`http://localhost:3001/videogames/${id}`)
          dispatch({
            type: GET_GAME_BY_ID,
            payload: data
          })
        } catch (error) {
          return error 
        }
      }
    }

      export const searchGameByName = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/videogames?name=${name}`)
      dispatch({
        type: SEARCH_GAME_BY_NAME,
        payload: data
      })
    } catch (error) {
      return error
    }
  }
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/genres");
      
      dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

export function changePage(order) {
  return async function (dispatch) {
    try {
      
      dispatch({
        type: PAGINATION,
        payload: order,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

export const filterGenre = (order) => {
  return async function (dispatch){
   try {    
       dispatch({
         type: FILTER_BY_GENRE,                 
         payload: order         
       })         
   } catch (error) {console.log(error)}} };

   
export const filterByRating = (order) => {
  return {
    type: FILTER_BY_RATING,
    payload: order
  };
};



export const sortAZ = (order) => {
  return {
    type: SORT_AZ,
    payload: order,
  };
};

export function createGame(payload){
  return async function(){
      const response = await axios.post('http://localhost:3001/videogames', payload)
      return response
  }
}
    