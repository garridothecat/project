import { createSlice } from '@reduxjs/toolkit';
import { getInitialPokemonData } from '../reducers/getInitialPokemonData';
import { getPokemonsData } from '../reducers/getPokemonsData';
import { getUserPokemons } from '../reducers/getUserPokemons';
import { removePokemonFromUserList } from '../reducers/removePokemonFromUserList';
import { PokemonInitialStateType, generatedPokemonType } from '../../utils/types';

const initialState: PokemonInitialStateType = {
	allPokemon: undefined,
	randomPokemons: undefined,
	compareQueue: [],
	userPokemons: [],
	currentPokemon: undefined,
};

export const PokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		addToCompare: (state, action) => {
			const index = state.compareQueue.findIndex((pokemon: generatedPokemonType) => pokemon.id === action.payload.id);
			if (index === -1) {
				if (state.compareQueue.length === 2) {
					state.compareQueue.pop();
				}
				state.compareQueue.unshift(action.payload);
			}
		},
		removeFromCompare: (state, action) => {
			const index = state.compareQueue.findIndex((pokemon: generatedPokemonType) => pokemon.id === action.payload.id);
			const queue = [...state.compareQueue];
			queue.splice(index, 1);
			state.compareQueue = queue;
		},
		setCurrentPokemon: (state, action) => {
			state.currentPokemon = action.payload;
		},
		resetRandomPokemons: state => {
			state.randomPokemons = undefined;
		},
	},

	extraReducers: builder => {
		builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
			state.allPokemon = action.payload;
		});
		builder.addCase(getPokemonsData.fulfilled, (state, action) => {
			state.randomPokemons = action.payload;
		});
		builder.addCase(getUserPokemons.fulfilled, (state, action) => {
			state.userPokemons = action.payload!;
		});
		builder.addCase(removePokemonFromUserList.fulfilled, (state, action) => {
			const userPokemons = [...state.userPokemons];
			const index = userPokemons.findIndex(pokemon => pokemon.firebaseId === action.payload?.id);
			userPokemons.splice(index, 1);
			state.userPokemons = userPokemons;
		});
	},
});

export const { addToCompare, removeFromCompare, setCurrentPokemon, resetRandomPokemons } = PokemonSlice.actions;

/*This TypeScript code defines another Redux slice, `PokemonSlice`, which is responsible for managing the state related to Pokémon data and comparisons. Here's a breakdown of the code:

1. Import Statements:
   - The code imports `createSlice` from the Redux Toolkit.
   - It also imports several actions (e.g., `getInitialPokemonData`, `getPokemonsData`, `getUserPokemons`, `removePokemonFromUserList`) from reducers that are likely used to fetch and manage Pokémon data.

2. Initial State:
   - `initialState` is an object that represents the initial state for the `PokemonSlice`. It includes the following properties:
     - `allPokemon`: A collection of Pokémon data.
     - `randomPokemons`: A collection of random Pokémon data.
     - `compareQueue`: An array that stores Pokémon to be compared.
     - `userPokemons`: An array to store Pokémon associated with the user.
     - `currentPokemon`: A single Pokémon that is currently selected.

3. `createSlice`:
   - `createSlice` is used to define the Redux slice named `PokemonSlice`. It takes an object with the following properties:
     - `name`: A string representing the name of the slice, which is `"pokemon"`.
     - `initialState`: The initial state object defined earlier.

4. Reducers:
   - The `reducers` object contains several functions, each of which corresponds to a specific action that can be dispatched:
     - `addToCompare`: Adds a Pokémon to the comparison queue if it's not already there. It ensures that the queue has a maximum length of 2.
     - `removeFromCompare`: Removes a Pokémon from the comparison queue.
     - `setCurrentPokemon`: Sets the currently selected Pokémon.
     - `resetRandomPokemons`: Resets the collection of random Pokémon.

5. `extraReducers`:
   - The `extraReducers` section specifies how this slice reacts to actions dispatched in other parts of the application. It uses `builder.addCase` to handle actions such as fetching initial Pokémon data, random Pokémon data, user Pokémon data, and removing a Pokémon from the user's collection. It updates the state based on the action's payload.

6. Export Actions:
   - The code exports the actions created by `createSlice` as named exports, making them available for use in other parts of the application.

This `PokemonSlice` manages various aspects of Pokémon data in the Redux store, including user Pokémon, comparison, and the currently selected Pokémon. The actions in this slice are used to modify the state and control different parts of the application's Pokémon-related functionality.*/
