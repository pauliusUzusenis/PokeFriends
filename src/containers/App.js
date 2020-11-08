import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import DescriptionCard from '../components/DescriptionCard';
import Modal from '../components/Modal';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestPokemons } from '../actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchPokemons.searchField,
		pokemons: state.requestPokemons.pokemons,
		isPending: state.requestPokemons.isPending,
		error: state.requestPokemons.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestPokemons: () => dispatch(requestPokemons()) //redux-thunk catches that this function returns a function, and gives it a dispatch parameter
	}
}

function App(props) {
	useEffect(() => {
		props.onRequestPokemons();
	}, [])
	
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedPokemonId, setSelectedPokemonId ] = useState(null);
	const [ selectedPokemonInfo, setSelectedPokemonInfo ] = useState(null);

	const toggleModalOn = (pokemonId) => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
		.then(response => response.json())
		.then(({name, stats, abilities }) => ({name, stats, abilities }))
		.then(data => {
			document.body.classList.add('modal-open');
			setSelectedPokemonId(pokemonId);
			setSelectedPokemonInfo(data);
			setShowModal(true);
		})
	}
	
	const toggleModalOff = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setSelectedPokemonId(null);
		setSelectedPokemonInfo(null);
	};
	
	const { searchField, onSearchChange, pokemons, isPending } = props;
	const filteredPokemons = pokemons.filter(pokemon => {
		return pokemon.name.toLowerCase().includes(searchField.toLowerCase()); 
	})
	return isPending ?
	<h1 className='tc f1'>Loading</h1> :
	(
		<div className='tc'>
			<h1 className='f1'>Find Your PoKéFriend</h1>
			<SearchBox searchChange={onSearchChange} />
			<ErrorBoundry>
				<Scroll>
					<CardList
						pokemons={filteredPokemons} 
						toggleModal={toggleModalOn} />
				</Scroll>
				{showModal &&
					<Modal toggleModal={toggleModalOff}>
						<DescriptionCard 
							id={selectedPokemonId} 
							data={selectedPokemonInfo} />
					</Modal>
				}
			</ErrorBoundry>
		</div>
	) 
}

export default connect(mapStateToProps, mapDispatchToProps)(App);