import axios from "axios";
import { GET_ALL_GAMES} from "./action-types"


// export function getAllGames() {
//     return async function(dispatch) {
//       try {
//         const result = await axios.get('http://localhost:3001/videogames')
//         console.log(result)
//         dispatch({
//             type: GET_ALL_GAMES,
//             payload: result.data
//         })
  
//       } catch (error) {
//         console.log(error)
//       }
//     } 
// };

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

// export function createGame(payload) {
//     return async function (dispatch) {
//       try {
//         const response = await axios.post("/videogame", payload);
//         console.log("Game created:", response.data); 
//       } catch (error) {
//         console.error("Error creating game:", error);
//       }
//     };
//   }


// export function createGame(payload){
//   return async function(){
//     const response = await axios("/videogame", payload)
//     return response
//   }
// }



// export const deleteGame = (id) => {
//     return {
//         type: DELETE_GAME,
//         payload: id
//     }
// };

// export function searchGame(name){
//   return async function(dispatch){
//     try {
//       const response = await axios.get(`http://localhost:3001/videogames?search=${name}`)
//       return dispatch({
//         type: SEARCH_GAME,
//         payload: response.data
//       })
//     } catch (error) {

//     }
//   }
// }

