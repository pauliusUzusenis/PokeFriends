import React, {Fragment} from 'react';
import Card from './Card';

const CardList = ({ pokemons, showModal, toggleModal }) => {
	return (
		<Fragment>
		{
			pokemons.map((pokemon, i) => {
			return (	
					<Card 
					key={pokemon.id} 
					id={pokemon.id} 
					name={pokemon.name}
					toggleModal={toggleModal}
					/>
					);	
			})
		}
		</Fragment>
	);
}

export default CardList;