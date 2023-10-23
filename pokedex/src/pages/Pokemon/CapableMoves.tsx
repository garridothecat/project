import React from 'react';
import { useAppSelector } from '../../app/hooks';

function CapableMoves() {
	const pokemonData = useAppSelector(({ pokemon: { currentPokemon } }) => currentPokemon);
	return (
		<div className='page capable-moves'>
			<h1 className='capable-moves-title'>Abilities</h1>
			<ul className='capable-moves-list ability'>
				{pokemonData?.pokemonAbilities.abilities.map((ability: string) => (
					<li className='move' key={ability}>
						{ability}
					</li>
				))}
			</ul>
			<h1 className='capable-moves-title'>Moves</h1>
			<ul className='capable-moves-list'>
				{pokemonData?.pokemonAbilities.moves.map((ability: string) => (
					<li className='move' key={ability}>
						{ability}
					</li>
				))}
			</ul>
		</div>
	);
}

export default CapableMoves;
/**The code you've provided is a React component written in JavaScript. It appears to be a part of a larger application or website, and it's called "CapableMoves." Let's break down the key elements of this code:

1. **React and Redux**: The code begins by importing the `React` library, which is necessary for creating React components. It also imports `useAppSelector` from the "../../app/hooks" module, which is likely a custom hook used for accessing state from a Redux store. This indicates that the component is designed to work with Redux, a state management library commonly used with React.

2. **Component Function**: The `CapableMoves` function is defined as a React functional component. Functional components are a way to create UI components in React.

3. **State Access**: Inside the component function, it uses the `useAppSelector` hook to access the Redux state. The state is extracted from the `pokemon` slice of the Redux store, and it appears to be specifically targeting the `currentPokemon` property.

4. **Rendering**: The component's render method returns JSX (JavaScript XML) code, which defines the structure and content of the component's user interface. The JSX includes:

   - Two `<h1>` elements with class names "capable-moves-title" and text content "Abilities" and "Moves."
   - Two `<ul>` elements with class names "capable-moves-list" and an additional "ability" class for one of them.
   - Inside these `<ul>` elements, it maps through an array of abilities (likely the abilities of a Pokémon) and renders each ability as an `<li>` element with a unique `key` based on the ability name.

5. **Export**: Finally, the component is exported as the default export of the module, making it available for use in other parts of the application.

This component is intended to display a list of abilities and moves for a Pokémon. It relies on Redux for state management and uses React to render the UI. The component assumes that the data structure in the Redux store includes a `pokemonAbilities` object with `abilities` and `moves` properties, both of which are arrays containing strings representing abilities and moves, respectively. */
