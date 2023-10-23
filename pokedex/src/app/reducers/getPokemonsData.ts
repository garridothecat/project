// @ts-nocheck

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { defaultImages, images, pokemonTypes } from '../../utils';
import { generatedPokemonType, genericPokemonType } from '../../utils/types';

export const getPokemonsData = createAsyncThunk('pokemon/randomPokemon', async (pokemons: genericPokemonType[]) => {
	try {
		const pokemonsData: generatedPokemonType[] = [];
		for await (const pokemon of pokemons) {
			const {
				data,
			}: {
				data: {
					id: number;
					types: { type: genericPokemonType }[];
				};
			} = await axios.get(pokemon.url);
			const types = data.types.map(({ type: { name } }: { type: { name: string } }) => ({
				[name]: pokemonTypes[name],
			}));
			let image: string = images[data.id];
			if (!image) {
				image = defaultImages[data.id];
			}
			if (image) {
				pokemonsData.push({
					name: pokemon.name,
					id: data.id,
					image,
					types,
				});
			}
		}
		return pokemonsData;
	} catch (err) {
		console.error(err);
	}
});

/*This TypeScript code defines yet another asynchronous Redux Thunk action creator, `getPokemonsData`, which appears to fetch data for a list of Pokémon and transform it into a specific format for storage in a Redux store.

Let's break down this code:

1. Import Statements:
   - The code imports `createAsyncThunk` from the Redux Toolkit, `axios` for making HTTP requests, and various constants and types from utility files.

2. `getPokemonsData` Definition:
   - `getPokemonsData` is created using `createAsyncThunk`, specifying the unique name for this action: `"pokemon/randomPokemon"`.

3. Async Function Parameters:
   - The async function takes a single parameter, `pokemons`, which is an array of `genericPokemonType` objects. This array likely contains information about Pokémon, including their names and URLs.

4. Async Function Logic:
   - Inside the async function, an empty array called `pokemonsData` is created to store the transformed Pokémon data.

   - A `for await...of` loop is used to iterate through each `pokemon` object in the `pokemons` array.

   - Within the loop, an HTTP GET request is made to the URL specified in `pokemon.url` using Axios. The response is destructured to extract the `data` property.

   - The `data` object is expected to contain `id` (number) and `types`, which is an array of objects with a `type` property. 

   - The `types` property is then transformed using the `map` function to create an array with the names of the Pokémon types. It also appears to map these names to values in the `pokemonTypes` object.

   - An image URL is determined for the Pokémon using the `images` and `defaultImages` objects, and it is stored in the `image` variable. If no image is found, it falls back to a default image URL.

   - Finally, a new object is created with the Pokémon's name, `id`, `image`, and `types`, and it is pushed into the `pokemonsData` array.

   - After all Pokémon have been processed, the `pokemonsData` array is returned.

   - If there are any errors during this process (e.g., an error in the HTTP request or data transformation), the error is caught and logged to the console.

So, `getPokemonsData` is an action that fetches data for a list of Pokémon, transforms it into a specific format, and returns it as part of a Redux action. This action can be dispatched to populate the Redux store with Pokémon data.*/
