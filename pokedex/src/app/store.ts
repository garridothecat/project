import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AppSlice, PokemonSlice } from './slices';

export const store = configureStore({
	reducer: {
		pokemon: PokemonSlice.reducer,
		app: AppSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

/*This code sets up and configures a Redux store for your application using the Redux Toolkit. Here's a breakdown of the code:

1. Import Statements:
   - The code imports several functions and types from the `@reduxjs/toolkit` library. These include `configureStore`, `ThunkAction`, and `Action`.

2. Store Configuration:
   - `store` is created using the `configureStore` function. It takes an object with a `reducer` property. In this case, two reducers are provided, one for the `pokemon` slice and one for the `app` slice. These reducers are responsible for managing different parts of the application's state.

3. Type Definitions:
   - Several type definitions are provided:
     - `AppDispatch`: This type represents the type of the Redux store's dispatch function. It's based on the `dispatch` function of the Redux store.
     - `RootState`: This type represents the type of the overall state of the Redux store. It's based on the result of calling `store.getState()`.
     - `AppThunk`: This type represents a Redux Thunk action, which is a function that can be used for asynchronous actions. It's defined using the `ThunkAction` type, specifying the return type, state type, and action type.

By configuring the store and defining these types, your application is set up to use Redux with the Redux Toolkit. You can access the store's dispatch function using `AppDispatch`, select parts of the state using `RootState`, and define asynchronous actions using `AppThunk`. This configuration ensures type safety and helps manage the state of your application effectively.*/
