import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { pokemonTabs } from '../../utils/constants';
import { AppTypeInitialState } from '../../utils/types';

const initialState: AppTypeInitialState = {
	isLoading: true,
	userInfo: undefined,
	toasts: [],
	currentPokemonTab: pokemonTabs.description,
};

export const AppSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setUserStatus: (state, action: PayloadAction<{ email: string } | undefined>) => {
			state.userInfo = action.payload;
		},
		setToast: (state, action: PayloadAction<string>) => {
			const toasts = [...state.toasts];
			toasts.push(action.payload);
			state.toasts = toasts;
		},
		clearToasts: state => {
			state.toasts = [];
		},
		setPokemonTab: (state, action) => {
			state.currentPokemonTab = action.payload;
		},
	},
});

export const { setLoading, setUserStatus, setToast, clearToasts, setPokemonTab } = AppSlice.actions;

/*This TypeScript code defines a Redux slice called `AppSlice` using the Redux Toolkit's `createSlice` function. A slice is a collection of Redux actions and a reducer that manages a specific portion of the application state.

Here's a breakdown of this code:

1. Import Statements:
   - The code imports `PayloadAction` and `createSlice` from the Redux Toolkit. It also imports constants and types from utility files.

2. Initial State:
   - `initialState` is an object that represents the initial state for the slice. It includes the following properties:
     - `isLoading`: A boolean indicating whether the application is in a loading state.
     - `userInfo`: Information about the user, which can be an object with an `email` property or `undefined`.
     - `toasts`: An array to store toast messages.
     - `currentPokemonTab`: A string representing the currently selected Pokémon tab, initialized with the constant `pokemonTabs.description`.

3. `createSlice`:
   - `createSlice` is used to define a Redux slice. It takes an object with the following properties:
     - `name`: A string representing the name of the slice, which is `"app"`.
     - `initialState`: The initial state object defined earlier.
     - `reducers`: An object containing functions that specify how the state should change in response to actions.

4. Reducers:
   - The `reducers` object contains the following functions, each of which corresponds to a specific action that can be dispatched:
     - `setLoading`: Updates the `isLoading` property in the state with a boolean value provided in the action payload.
     - `setUserStatus`: Updates the `userInfo` property with an object containing an `email` property or `undefined`.
     - `setToast`: Adds a new toast message to the `toasts` array.
     - `clearToasts`: Clears all toast messages from the `toasts` array.
     - `setPokemonTab`: Updates the `currentPokemonTab` with the action's payload.

5. Export Actions:
   - The code exports the actions created by `createSlice` as named exports, making them available for use in other parts of the application.

So, `AppSlice` is a Redux slice that handles actions related to the application's loading state, user status, toast messages, and the currently selected Pokémon tab. These actions can be dispatched within your Redux application to update the corresponding portions of the application state.*/
