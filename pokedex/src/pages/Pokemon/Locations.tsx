import React from 'react';
import { useAppSelector } from '../../app/hooks';

function Locations() {
	const pokemonData = useAppSelector(({ pokemon: { currentPokemon } }) => currentPokemon);
	return (
		<div className='pokemon-locations'>
			<ul className='pokemon-locations-list'>
				{pokemonData?.encounters.map((encounter: string) => (
					<li key={encounter} className='pokemon-location'>
						{encounter}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Locations;

/**The provided code is a React component called "Locations." This component is designed to display information about the locations where a Pokémon can be encountered or found. Let's break down the key elements of this code:

1. **React and Redux**: The code begins by importing React and the `useAppSelector` hook from "../../app/hooks." This hook is used to access the Redux store's state, suggesting that the component relies on Redux for its data.

2. **Component Function**: The `Locations` function is defined as a React functional component. Functional components are used to create UI components in React.

3. **State Access**: Inside the component function, it uses the `useAppSelector` hook to access the Redux state. Specifically, it extracts the `currentPokemon` property from the `pokemon` slice of the Redux store, indicating that the component is meant to display location information for the currently selected Pokémon.

4. **Rendering**: The component's render method returns JSX (JavaScript XML) code, which defines the structure and content of the component's user interface. It includes:

   - A `<div>` element with the class name "pokemon-locations," serving as a container for the location information.

   - Inside this container, there is an ordered list (`<ul>`) with the class name "pokemon-locations-list." This list will be used to display the locations where the Pokémon can be encountered.

   - The `encounters` property of `pokemonData` is mapped through using the `.map` method. This property likely contains an array of strings representing different locations or ways the Pokémon can be encountered.

   - For each encounter location, a list item (`<li>`) is rendered with a unique `key` attribute set to the `encounter` string, and the `encounter` string is displayed as the content of the list item.

5. **Export**: The component is exported as the default export of the module, making it available for use in other parts of the application.

In summary, the "Locations" component is responsible for displaying a list of locations or encounters where a Pokémon can be found. It relies on Redux to access the data and maps through the list of encounters to render them as a list in the user interface. This component is a part of a larger application or website that provides information about Pokémon. */
