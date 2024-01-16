import React from 'react';

const Card = ({ name, id, toggleModal }) => {
	return (
		<div className='tc card dib br3 pa4 ma3 grow bw2 shadow-4' onClick={() => toggleModal(id) }>
			<img alt='admin' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
			<div>
				<h2 className='ttc'>{name}</h2>
			</div>
		</div>
	)
}

export default Card;
