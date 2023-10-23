import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PokemonCardGrid from '../../components/PokemonCardGrid';
import { getPokemonsData } from '../../app/reducers/getPokemonsData';
import Loader from '../../components/Loader';
import { genericPokemonType } from '../../utils/types';

function Evolution() {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useAppDispatch();
	const pokemonData = useAppSelector(({ pokemon }) => pokemon);
	useEffect(() => {
		const fetchData = async () => {
			const pokemons: genericPokemonType[] = pokemonData.currentPokemon!.evolution.map(({ pokemon }: { pokemon: genericPokemonType }) => pokemon);
			await dispatch(getPokemonsData(pokemons));
			setIsLoaded(true);
		};
		fetchData();
	}, [dispatch, pokemonData.currentPokemon]);

	return <div className='page'>{isLoaded ? <PokemonCardGrid pokemons={pokemonData.randomPokemons!} /> : <Loader />}</div>;
}

export default Evolution;

/**The provided code is a React component called "Evolution." This component appears to be part of a larger React application and is used for displaying information related to the evolution of a Pokémon. Let's break down the key elements of this code:

1. **React and Redux**: The code begins by importing React, several custom components, and functions from the application's Redux store, including `useAppDispatch` and `useAppSelector`. This suggests that Redux is used for state management in the application.

2. **Component State**: Inside the component, there is a state variable called `isLoaded` created using the `useState` hook. This variable is used to track whether the data has been loaded.

3. **Redux Dispatch**: The `useAppDispatch` hook is used to obtain the dispatch function, which is used to trigger Redux actions. The `useAppSelector` hook is used to access the Redux state.

4. **`useEffect` Hook**: The component uses the `useEffect` hook, which runs side effects in function components. In this case, it is used to fetch data when the component mounts. The `fetchData` function is defined and then invoked inside the `useEffect`.

5. **Data Fetching**: Inside the `useEffect`, the code first extracts an array of Pokémon data from the `evolution` property of the `currentPokemon` within the Redux store. This suggests that the component is meant to display information about the evolution of the currently selected Pokémon.

6. **Redux Action Dispatch**: The `dispatch` function is used to call the `getPokemonsData` action with the array of Pokémon data. This action appears to be responsible for fetching data about multiple Pokémon.

7. **Setting `isLoaded`**: After the data is fetched and the action is dispatched, `isLoaded` is set to `true`, indicating that the data has been loaded.

8. **Conditional Rendering**: The component's render method returns JSX code. It conditionally renders one of two components based on the value of `isLoaded`:
   - If `isLoaded` is `true`, it renders a "PokemonCardGrid" component, passing in an array of Pokémon data from the Redux store (`pokemonData.randomPokemons`).
   - If `isLoaded` is `false`, it renders a "Loader" component, indicating that the data is still being loaded.

9. **Export**: The component is exported as the default export of the module, making it available for use in other parts of the application.

In summary, the "Evolution" component is responsible for displaying information about the evolution of a Pokémon. It fetches data related to the evolution from the Redux store, uses conditional rendering to display the data when it's loaded, and shows a loading indicator while the data is being fetched. This structure allows for a smooth and informative user experience in the larger application. */
