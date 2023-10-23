// @ts-nocheck

import { useCallback, useEffect, useState } from 'react';
import Wrapper from '../sections/Wrapper';
import { useParams } from 'react-router-dom';
import { defaultImages, images } from '../utils';
import { extractColors } from 'extract-colors';
import axios from 'axios';
import Evolution from './Pokemon/Evolution';
import Locations from './Pokemon/Locations';
import CapableMoves from './Pokemon/CapableMoves';
import Description from './Pokemon/Description';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCurrentPokemon } from '../app/slices/PokemonSlice';
import { setPokemonTab } from '../app/slices/AppSlice';
import Loader from '../components/Loader';
import { pokemonRoute, pokemonSpeciesRoute, pokemonTabs } from '../utils/constants';

function Pokemon() {
	const params = useParams();
	const dispatch = useAppDispatch();
	const currentPokemonTab = useAppSelector(({ app: { currentPokemonTab } }) => currentPokemonTab);
	const currentPokemon = useAppSelector(({ pokemon: { currentPokemon } }) => currentPokemon);

	useEffect(() => {
		dispatch(setPokemonTab(pokemonTabs.description));
	}, [dispatch]);

	const getRecursiveEvolution = useCallback((evolutionChain, level, evolutionData) => {
		if (!evolutionChain.evolves_to.length) {
			return evolutionData.push({
				pokemon: {
					...evolutionChain.species,
					url: evolutionChain.species.url.replace('pokemon-species', 'pokemon'),
				},
				level,
			});
		}
		evolutionData.push({
			pokemon: {
				...evolutionChain.species,
				url: evolutionChain.species.url.replace('pokemon-species', 'pokemon'),
			},
			level,
		});
		return getRecursiveEvolution(evolutionChain.evolves_to[0], level + 1, evolutionData);
	}, []);

	const getEvolutionData = useCallback(
		evolutionChain => {
			const evolutionData = [];
			getRecursiveEvolution(evolutionChain, 1, evolutionData);
			return evolutionData;
		},
		[getRecursiveEvolution],
	);

	const [isDataLoading, setIsDataLoading] = useState(true);
	const getPokemonInfo = useCallback(
		async image => {
			const { data } = await axios.get(`${pokemonRoute}/${params.id}`);
			const { data: dataEncounters } = await axios.get(data.location_area_encounters);

			const {
				data: {
					evolution_chain: { url: evolutionURL },
				},
			} = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
			const { data: evolutionData } = await axios.get(evolutionURL);

			const pokemonAbilities = {
				abilities: data.abilities.map(({ ability }) => ability.name),
				moves: data.moves.map(({ move }) => move.name),
			};

			const encounters = [];
			const evolution = getEvolutionData(evolutionData.chain);
			let evolutionLevel;
			evolutionLevel = evolution.find(({ pokemon }) => pokemon.name === data.name).level;
			dataEncounters.forEach(encounter => {
				encounters.push(encounter.location_area.name.toUpperCase().split('-').join(' '));
			});
			const stats = await data.stats.map(({ stat, base_stat }) => ({
				name: stat.name,
				value: base_stat,
			}));
			dispatch(
				setCurrentPokemon({
					id: data.id,
					name: data.name,
					types: data.types.map(({ type: { name } }) => name),
					image,
					stats,
					encounters,
					evolutionLevel,
					evolution,
					pokemonAbilities,
				}),
			);
			setIsDataLoading(false);
		},
		[params.id, dispatch, getEvolutionData],
	);

	useEffect(() => {
		const imageElemet = document.createElement('img');
		imageElemet.src = images[params.id];
		const options = {
			pixels: 10000,
			distance: 1,
			splitPower: 10,
			colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
			saturationDistance: 0.2,
			lightnessDistance: 0.2,
			hueDistance: 0.083333333,
		};
		const getColor = async () => {
			const color = await extractColors(imageElemet.src, options);
			const root = document.documentElement;
			root.style.setProperty('--accent-color', color[0].hex.split('"')[0]);
		};
		getColor();
		let image = images[params.id];
		if (!image) {
			image = defaultImages[params.id];
		}

		getPokemonInfo(image);
	}, [params.id, getPokemonInfo]);

	return (
		<>
			{!isDataLoading && currentPokemon ? (
				<>
					{currentPokemonTab === pokemonTabs.description && <Description />}
					{currentPokemonTab === pokemonTabs.evolution && <Evolution />}
					{currentPokemonTab === pokemonTabs.locations && <Locations />}
					{currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
				</>
			) : (
				<Loader />
			)}
		</>
	);
}

export default Wrapper(Pokemon);

/**The provided code is a React component called "Pokemon." It appears to be part of a web application that displays information about Pokémon. This component handles various aspects related to a specific Pokémon, such as its description, evolution, locations, and moves. Let's break down the key elements of this code:

1. **Imports**: The code imports various dependencies, including React, custom components, functions, and libraries like `axios` and `extract-colors`. It also uses hooks such as `useEffect`, `useState`, and custom Redux hooks like `useAppDispatch` and `useAppSelector`.

2. **State Management**: The component uses the Redux store to manage the application's state. It extracts relevant state variables using the `useAppSelector` hook, including `currentPokemonTab` and `currentPokemon`. It also dispatches actions using `useAppDispatch` to update the state.

3. **Data Fetching**: The `useEffect` hook is used for data fetching and side effects. It performs the following tasks:
   - Fetches information about the current Pokémon, such as abilities, moves, types, encounters, and more.
   - Retrieves color data from the Pokémon's image and sets it as a CSS variable for styling purposes.

4. **Utility Functions**: The component defines several utility functions, including `getRecursiveEvolution` and `getEvolutionData`, to process Pokémon evolution chain data.

5. **Conditional Rendering**: The component conditionally renders different sections based on the `currentPokemonTab` state variable, which indicates which tab or section is currently active. The available sections include "Description," "Evolution," "Locations," and "CapableMoves." It uses the `<Description />`, `<Evolution />`, `<Locations />`, and `<CapableMoves />` components to render these sections.

6. **Loading Indicator**: While data is being loaded (as indicated by `isDataLoading`), a loading indicator component (`<Loader />`) is displayed.

7. **Color Styling**: The component attempts to extract a dominant color from the Pokémon's image and sets it as a CSS variable for styling purposes. This allows for dynamic theming based on the Pokémon's appearance.

8. **Wrapper Component**: The component is wrapped with the `Wrapper` component, which may provide additional functionality or styling to the "Pokemon" component.

In summary, the "Pokemon" component is responsible for displaying detailed information about a specific Pokémon, such as its description, evolution, locations, and moves. It leverages Redux for state management and uses various utility functions to process data. Additionally, it dynamically adjusts the color theme based on the Pokémon's image, providing an interactive and visually appealing user experience. */
