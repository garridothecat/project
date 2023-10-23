import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, query, where } from 'firebase/firestore';
import { pokemonListRef } from '../../utils/firebaseConfig';
import { defaultImages, images, pokemonTypes } from '../../utils';
import { RootState } from '../store';
import { userPokemonsType } from '../../utils/types';
export const getUserPokemons = createAsyncThunk('pokemon/userList', async (args, { getState }) => {
	try {
		const {
			app: { userInfo },
		} = getState() as RootState;
		if (!userInfo?.email) {
			return;
		}
		const firestoreQuery = query(pokemonListRef, where('email', '==', userInfo?.email));
		const fetchedPokemons = await getDocs(firestoreQuery);
		if (fetchedPokemons.docs.length) {
			const userPokemons: userPokemonsType[] = [];
			fetchedPokemons.forEach(async pokemon => {
				const pokemons = await pokemon.data().pokemon;
				// @ts-ignore
				let image = images[pokemons.id];
				if (!image) {
					// @ts-ignore
					image = defaultImages[pokemons.id];
				}
				const types = pokemons.types.map((name: string) => ({
					// @ts-ignore
					[name]: pokemonTypes[name],
				}));

				userPokemons.push({
					...pokemons,
					firebaseId: pokemon.id,
					image,
					types,
				});
			});
			return userPokemons;
		}
		return [];
	} catch (err) {
		console.log(err);
	}
});

/*This TypeScript code defines yet another asynchronous Redux Thunk action creator, `getUserPokemons`. This action is responsible for fetching Pokémon data from a Firebase Firestore database based on user information and transforming it into a specific format for storage in a Redux store.

Let's break down this code:

1. Import Statements:
   - The code imports `createAsyncThunk` from the Redux Toolkit, as well as functions from Firebase Firestore and various constants and types from utility files.

2. `getUserPokemons` Definition:
   - `getUserPokemons` is created using `createAsyncThunk`, specifying the unique name for this action: `"pokemon/userList"`.

3. Async Function Parameters:
   - The async function takes two parameters:
     - `args`: Although it's specified as a parameter, it's not used in the function.
     - `{ getState }`: This object destructures `getState` from the second argument, which allows the action to access the current state of the Redux store.

4. Async Function Logic:
   - Inside the async function, the code attempts to get the user information from the Redux store using `getState`. This information is expected to be located in the `app` slice of the store.

   - If the user is not logged in (userInfo.email doesn't exist or is falsy), the function returns early.

   - If the user is logged in, a Firebase Firestore query is constructed using the `query`, `pokemonListRef`, and `where` functions. This query is designed to retrieve Pokémon data associated with the user's email.

   - The code then fetches data using the query with `getDocs` and stores the result in the `fetchedPokemons` variable.

   - If there are documents returned from the query (i.e., `fetchedPokemons.docs.length` is not zero), a `userPokemons` array is initialized.

   - A loop iterates through each document in `fetchedPokemons` and processes each Pokémon:

     - Data is extracted from the document using `pokemon.data()`.
     - The image URL for the Pokémon is determined from the `images` and `defaultImages` objects, and types are mapped to their corresponding values in the `pokemonTypes` object.
     - A new object is created with the Pokémon's data, including the image URL, types, and Firebase Firestore document ID, and it's added to the `userPokemons` array.

   - After all Pokémon data is processed, the `userPokemons` array is returned.

   - If no documents were found in the query, an empty array is returned.

   - If any errors occur during this process, they are caught and logged to the console.

So, `getUserPokemons` is an action that fetches Pokémon data from a Firebase Firestore database based on the user's email and transforms it into a specific format. This action can be dispatched to update the Redux store with the user's Pokémon data.*/
