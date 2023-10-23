import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { removeFromCompare } from '../app/slices/PokemonSlice';
import { useAppDispatch } from '../app/hooks';
import { addPokemonToList } from '../app/reducers/addPokemonToList';
import { pokemonTypes } from '../utils';
import { pokemonStatType, pokemonTypeInterface, userPokemonsType } from '../utils/types';
function CompareContainer({ pokemon = undefined, isEmpty = false }: { pokemon?: userPokemonsType; isEmpty?: boolean }) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const createStatsArray = (types: pokemonTypeInterface[], statType: pokemonStatType) => {
		const statsArray: { name: string; image: string }[] = [];
		const statsSet = new Set<string>();
		types.forEach((type: pokemonTypeInterface) => {
			const key = Object.keys(type)[0];
			type[key][statType].forEach((stat: string) => {
				if (!statsSet.has(stat)) {
					// @ts-ignore
					statsArray.push({ name: stat, image: pokemonTypes[stat].image });
					statsSet.add(stat);
				}
			});
		});
		return statsArray;
	};
	const getStats = () => {
		return (
			<>
				<div className='pokemon-types'>
					<h4 className='pokemon-type-title'>Strength</h4>
					<div className='pokemon-type-icons'>
						{createStatsArray(pokemon?.types!, 'strength').map((stat: { image: string }) => (
							<div className='pokemon-type'>
								<img src={stat.image} alt='' className='pokemon-type-image' />
							</div>
						))}
					</div>
				</div>
				<div className='pokemon-types'>
					<h4 className='pokemon-type-title'>Weakness</h4>
					<div className='pokemon-type-icons'>
						{createStatsArray(pokemon?.types!, 'weakness').map((stat: { image: string }) => (
							<div className='pokemon-type'>
								<img src={stat.image} alt='' className='pokemon-type-image' />
							</div>
						))}
					</div>
				</div>
				<div className='pokemon-types'>
					<h4 className='pokemon-type-title'>Resistance</h4>
					<div className='pokemon-type-icons'>
						{createStatsArray(pokemon?.types!, 'resistance').map((stat: { image: string }) => (
							<div className='pokemon-type'>
								<img src={stat.image} alt='' className='pokemon-type-image' />
							</div>
						))}
					</div>
				</div>
				<div className='pokemon-types'>
					<h4 className='pokemon-type-title'>Vulnerable</h4>
					<div className='pokemon-type-icons'>
						{createStatsArray(pokemon?.types!, 'vulnerable').map((stat: { image: string }) => (
							<div className='pokemon-type'>
								<img src={stat.image} alt='' className='pokemon-type-image' />
							</div>
						))}
					</div>
				</div>
			</>
		);
	};
	return (
		<div className='compare-container'>
			{isEmpty && (
				<div className='empty'>
					<button onClick={() => navigate('/search')}>
						<FaPlus />
					</button>
					<h3>Add Pokemon for Comparison</h3>
				</div>
			)}
			{pokemon && (
				<div className='compare-element' key={pokemon?.id}>
					<div className='compare-info'>
						<div className='compare-details'>
							<h3>{pokemon?.name}</h3>
							<img src={pokemon?.image} alt='pokemon' className='compare-image' />
						</div>
						<div className='pokemon-types-container'>
							<div className='pokemon-types'>
								<h4 className='pokemon-type-title'>Type</h4>
								<div className='pokemon-type-icons'>
									{pokemon?.types.map((type: pokemonTypeInterface) => {
										const keys = Object.keys(type);
										return (
											<div className='pokemon-type'>
												<img src={type[keys[0]].image} alt='pokemon type' className='pokemon-type-image' loading='lazy' />
											</div>
										);
									})}
								</div>
							</div>
							{getStats()}
						</div>
					</div>
					<div className='compare-action-buttons'>
						<button
							className='compare-btn'
							onClick={() => {
								dispatch(addPokemonToList(pokemon));
							}}
						>
							Add
						</button>
						<button className='compare-btn' onClick={() => navigate(`/pokemon/${pokemon?.id}`)}>
							View
						</button>
						<button className='compare-btn' onClick={() => dispatch(removeFromCompare({ id: pokemon?.id }))}>
							Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CompareContainer;

/**The provided code is a React functional component written in TypeScript. This component appears to be a part of a larger application related to comparing and managing Pokémon data. Here's a breakdown of the code:

1. **Imports**:
   - Several dependencies and utilities are imported using ES6 `import` statements. These include `React`, various components/icons from the `react-icons` library, functions and types from different files within the project, and utility functions like `useNavigate` and `useAppDispatch` from React Router and Redux, respectively.

2. **Function Declaration**:
   - The `CompareContainer` function is declared. It takes an object as a parameter with two optional properties: `pokemon` and `isEmpty`. These properties have default values of `undefined` and `false`, respectively. This means the component can be called with or without these properties.

3. **Function Body**:
   - Inside the `CompareContainer` function, the component is defined.

4. **createStatsArray Function**:
   - The `createStatsArray` function is defined, which takes an array of `pokemonTypeInterface` and a `pokemonStatType` as arguments. This function processes the provided types and returns an array of objects, where each object has a `name` and `image`. The purpose of this function appears to be related to handling the strengths, weaknesses, resistances, and vulnerabilities of Pokémon types.

5. **getStats Function**:
   - The `getStats` function is defined. It returns JSX, which includes various sections for displaying Pokémon type information (strength, weakness, resistance, and vulnerability). It utilizes the `createStatsArray` function to generate the icons/images for each type.

6. **Component Render**:
   - The component renders a `<div>` element with the class name "compare-container."
   - It includes conditional rendering based on whether the component is in an "empty" state or has a valid "pokemon" object to display.
   - If the component is empty, it displays a message and a button to navigate to the "/search" route.
   - If a "pokemon" object is provided, it displays information about the Pokémon, such as its name, image, types, and additional options for adding, viewing, or removing it.

7. **Export**:
   - The `CompareContainer` component is exported as the default export of this module, making it available for use in other parts of the application.

This component seems to be a part of a Pokémon-related application and is responsible for displaying and managing the comparison of Pokémon entities. It utilizes various utility functions and components to achieve this functionality. */
