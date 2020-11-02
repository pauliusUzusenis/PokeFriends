import React from 'react';

const DescriptionCard = ({ id, data }) => {
	return (
		<div className='tc descriptionCard dib br3 pa3 ma3 shadow-4'>
			<div className='smallCard center'>
				<img alt='admin' src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}/>
				<div>
					<h2 className='ttu mt2 mb0'>{data.name}</h2>
				</div>
			</div>
			<div>
				<h3 className='tc ttu'>Stats</h3>
				<table className='descriptionCardTable ttu mt1 mb3'>
				<tbody>
				{
					data.stats.map((stat, index) => {
						return (
							<tr key={index}>
								<td className='tl'>{stat.stat.name}:</td>
								<td className='tr'>{stat.base_stat}</td>
							</tr>
						)
					})
				}
				</tbody>
				</table>
				<h3 className='tc ttu mt1 mb2'>Abilities</h3>
				{
					data.abilities.map((ability, index) => {
						return (
							<p key={index} className='ttu mt0 mb0'>{ability.ability.name}</p>
						)
					})
				}
			</div>
		</div>
	)
}

export default DescriptionCard;