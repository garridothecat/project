// @ts-nocheck

import React, { useEffect } from 'react';
import Wrapper from '../sections/Wrapper';
import { debounce } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { getPokemonsData } from '../app/reducers/getPokemonsData';
import Loader from '../components/Loader';
import { setLoading } from '../app/slices/AppSlice';

import PokemonCardGrid from '../components/PokemonCardGrid';

function Search() {
	const handleChange = debounce((value: string) => getPokemon(value), 300);
	const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);

	const dispatch = useAppDispatch();
	const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);

	useEffect(() => {
		dispatch(getInitialPokemonData());
	}, [dispatch]);

	useEffect(() => {
		if (allPokemon) {
			const clonedPokemons = [...allPokemon];
			const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
			dispatch(getPokemonsData(randomPokemonsId));
		}
	}, [allPokemon, dispatch]);

	useEffect(() => {
		if (randomPokemons) {
			dispatch(setLoading(false));
		}
	}, [randomPokemons, dispatch]);

	const getPokemon = async (value: string) => {
		if (value.length) {
			const pokemons = allPokemon.filter(pokemon => pokemon.name.includes(value.toLowerCase()));
			dispatch(getPokemonsData(pokemons));
		} else {
			const clonedPokemons = [...allPokemon];
			const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
			dispatch(getPokemonsData(randomPokemonsId));
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className='search'>
					<input type='text' onChange={e => handleChange(e.target.value)} className='pokemon-searchbar' placeholder='Search Pokemon' />
					<PokemonCardGrid pokemons={randomPokemons} />
				</div>
			)}
		</>
	);
}

export default Wrapper(Search);

/**The provided code is a React component called "Search." This component is part of a web application that allows users to search for and view Pokémon data. It uses Redux for state management and includes a debounced search feature. Let's break down the key elements of this code:

1. **Imports**: The code imports various dependencies, including React, custom components, utility functions like `debounce`, and Redux-related functions and actions.

2. **State Management**: The component uses the Redux store to manage the application's state. It extracts state variables using the `useAppSelector` hook, including `isLoading`, `allPokemon`, and `randomPokemons`. It also uses the `useAppDispatch` hook to dispatch actions.

3. **Debounced Search**: The `handleChange` function is a debounced function that is used to handle user input in the search bar. It calls the `getPokemon` function with the search value after a 300-millisecond debounce delay.

4. **Data Fetching**: The component fetches Pokémon data when it mounts and when the `allPokemon` state is available. It retrieves an initial set of Pokémon data and also selects a random subset of Pokémon for display.

5. **Loading Indicator**: While data is being loaded (as indicated by `isLoading`), a loading indicator component (`<Loader />`) is displayed.

6. **Search Function**: The `getPokemon` function is used for searching Pokémon based on the user's input. It filters the `allPokemon` array to find Pokémon with names that contain the search value. If the search value is empty, it selects a random subset of Pokémon for display.

7. **Render Method**: The component's render method returns JSX code, which defines the structure and content of the component's user interface. It includes:
   - An input element for the search bar, where users can enter search queries.
   - A `PokemonCardGrid` component that displays Pokémon cards based on the search results or random Pokémon data.

In summary, the "Search" component allows users to search for Pokémon by name. It provides a debounced search feature for smoother user interactions and uses Redux for state management. While data is being fetched, a loading indicator is displayed, and when the data is available, it renders a search bar and a grid of Pokémon cards. The `Wrapper` component is used to provide additional functionality or styling to the "Search" component, and it is part of a larger web application focused on Pokémon-related content. */
