import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc } from 'firebase/firestore';
import { pokemonListRef } from '../../utils/firebaseConfig';
import { getUserPokemons } from './getUserPokemons';
import { setToast } from '../slices/AppSlice';
import { pokemonStatsType, pokemonTypeInterface, userPokemonsType } from '../../utils/types';
import { RootState } from '../store';

export const addPokemonToList = createAsyncThunk(
	'pokemon/addPkemon',
	async (
		pokemon: {
			id: number;
			name: string;
			types: pokemonTypeInterface[] | string[];
			stats?: pokemonStatsType[];
		},
		{ getState, dispatch },
	) => {
		try {
			const {
				app: { userInfo },
				pokemon: { userPokemons },
			} = getState() as RootState;
			if (!userInfo?.email) {
				return dispatch(setToast('Please login in order to add pokemon to your collection.'));
			}
			const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
				return userPokemon.name === pokemon.name;
			});
			if (index === -1) {
				let types: string[] = [];
				if (!pokemon.stats) {
					pokemon.types.forEach((type: any) => types.push(Object.keys(type).toString()));
				} else {
					types = pokemon.types as string[];
				}
				await addDoc(pokemonListRef, {
					pokemon: { id: pokemon.id, name: pokemon.name, types },
					email: userInfo.email,
				});
				await dispatch(getUserPokemons());
				dispatch(setToast(`${pokemon.name} added to your collection.`));
			} else {
				dispatch(setToast(`${pokemon.name} already part of your collection.`));
			}
		} catch (err) {
			console.log({ err });
		}
	},
);

/*This TypeScript code defines an asynchronous Redux Thunk action creator, `addPokemonToList`, which is part of a Redux store. It appears to be used in a web application, possibly related to Pokémon collections.

Let's break down this code step by step:

1. Import Statements:
   - Various dependencies and utility functions are imported at the beginning of the code. These include `createAsyncThunk` from the Redux Toolkit, `addDoc` from the Firebase Firestore library, and other custom utility functions and types.

2. `addPokemonToList` Definition:
   - `addPokemonToList` is created using `createAsyncThunk`, which is a Redux Toolkit function for defining asynchronous action creators.

3. Action Name:
   - `"pokemon/addPokemon"`: This is the unique name for this action.

4. Async Function Parameters:
   - The async function takes two parameters:
     - `pokemon`: An object that includes information about a Pokémon. It has an `id` (number), `name` (string), `types` (an array of Pokémon types), and an optional `stats` array.
     - `{ getState, dispatch }`: These are destructured from the second argument. `getState` allows the action to access the current state of the Redux store, and `dispatch` is used to dispatch other Redux actions.

5. Async Function Logic:
   - The code inside the async function performs the following tasks:
     - It attempts to get the current state of the Redux store using `getState` and extracts relevant data from it, such as user information and userPokemons.
     - It checks if the user is logged in (has an email) and displays a toast message if not.
     - It searches for the given Pokémon in the user's collection using the `findIndex` method.
     - If the Pokémon is not found (index is -1), it prepares data and adds the Pokémon to the user's collection in the Firebase Firestore database using `addDoc`. Then, it dispatches the `getUserPokemons` action to update the user's collection and displays a success toast message.
     - If the Pokémon is already in the collection, it displays a toast message indicating that it's already part of the collection.
     - In case of any errors during this process, an error message is logged to the console.

Overall, this code defines an action that allows a user to add Pokémon to their collection in a Firebase Firestore database, provided they are logged in. It uses Redux to manage the state and display toast messages for various scenarios. This action is designed to work within a larger Redux store and application structure. */
