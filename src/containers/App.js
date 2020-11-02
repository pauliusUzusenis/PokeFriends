import React, { Component } from 'react';
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

const initialState = {
	showModal: false,
	selectedPokemonId: null,
	selectedPokemonInfo: null
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	componentDidMount() {
		this.props.onRequestPokemons();
	}

	toggleModal = (selectedPokemonId) => {
		if (selectedPokemonId) {
			fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`)
			.then(response => response.json())
			.then(({name, stats, abilities }) => ({name, stats, abilities }))
			.then(data => {
				this.setState({
					showModal: !this.state.showModal,
					selectedPokemonId: selectedPokemonId,
					selectedPokemonInfo: data
				})
			})
		}
		else {
			this.setState({ 
				showModal: !this.state.showModal,
				selectedPokemonId: null,
				selectedPokemonInfo: null
			})
		}
	};
	
	render() {
		const { searchField, onSearchChange, pokemons, isPending } = this.props;
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
						toggleModal={this.toggleModal}
						showModal={this.state.showModal}
						selectPokemon={this.selectPokemon} />
					</Scroll>
					{this.state.showModal &&
						<Modal toggleModal={this.toggleModal}>
							<DescriptionCard id={this.state.selectedPokemonId} data={this.state.selectedPokemonInfo}></DescriptionCard>
						</Modal>
					}
				</ErrorBoundry>
			</div>
		) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);