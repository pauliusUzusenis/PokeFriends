import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_POKEMONS_PENDING,
	REQUEST_POKEMONS_SUCCESS,
	REQUEST_POKEMONS_FAILED
	} from './constants.js';

const initialStateSearch = {
	searchField: ''
}

const initialStatePokemons = {
	isPending: false,
	pokemons: [],
	error: ''
}

export const searchPokemons = (state=initialStateSearch, action={}) =>{
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, {searchField: action.payload});
		default:
		return state;
	}
}

export const requestPokemons = (state=initialStatePokemons, action={}) => {
	switch(action.type) {
		case REQUEST_POKEMONS_PENDING:
			return Object.assign({}, state, { isPending: true })
		case REQUEST_POKEMONS_SUCCESS:
			return Object.assign({}, state, { pokemons: action.payload, isPending: false })
		case REQUEST_POKEMONS_FAILED: 
			return Object.assign({}, state, { error: action.payload, isPending: false })
		default:
			return state;
	}
}