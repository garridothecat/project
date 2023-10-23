import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*This code provides utility functions and types for working with Redux within a React application. Let's break it down:

1. Import Statements:
   - The code imports `TypedUseSelectorHook`, `useDispatch`, and `useSelector` from `'react-redux'`. These are part of the Redux Toolkit and React-Redux library.

2. Type Definitions:
   - The code assumes there is a `RootState` type and an `AppDispatch` type, which are expected to be defined in the `'./store'` module. These types represent the state of the Redux store and the dispatch function.

3. `useAppDispatch` Function:
   - `useAppDispatch` is a custom hook that returns the Redux dispatch function (`AppDispatch`). This hook provides a way to access the dispatch function in functional components. By using `useAppDispatch`, you can dispatch actions to the Redux store within your React components.

4. `useAppSelector` Typed Selector Hook:
   - `useAppSelector` is a typed selector hook that uses `TypedUseSelectorHook` to specify the type of the `RootState`. This hook allows you to select and access specific parts of the Redux store's state. It's a strongly typed version of the `useSelector` hook from React-Redux.

These utility functions and types are often used in React components to interact with the Redux store. They provide a way to access the store's state and dispatch actions while ensuring type safety and avoiding common Redux-related errors.*/
