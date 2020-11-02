import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_POKEMONS_PENDING,
	REQUEST_POKEMONS_SUCCESS,
	REQUEST_POKEMONS_FAILED
	} from './constants.js';

export const setSearchField = (text) => ({
		type: CHANGE_SEARCH_FIELD,
		payload: text
})

// async action
export const requestPokemons = () => (dispatch) => {
	dispatch({type: REQUEST_POKEMONS_PENDING});
	
	fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
	.then(response => response.json())
	.then(response => response.results)
	.then(pokemons => {
		return Promise.all(pokemons.map(pokemon => {
			return fetch(pokemon.url)
			.then(data => data.json())
			.then(({id, name}) => ({id, name}))
		}))
	})
	.then(data => dispatch({ type: REQUEST_POKEMONS_SUCCESS, payload: data }))
	.catch(error => dispatch({ type: REQUEST_POKEMONS_FAILED, payload: error }))
}