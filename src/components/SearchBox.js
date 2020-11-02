import React from 'react';

const SearchBox = ({ searchChange }) => {
	return (
		<div className='pa2'>
			<input 
			className='pa3 br2 searchBox ba purple b--purple bg-washed-yellow'
			type='search' 
			placeholder='search pokemons' 
			onChange={searchChange}
			/>
		</div>
		);
}

export default SearchBox;