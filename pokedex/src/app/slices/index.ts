export { PokemonSlice } from './PokemonSlice';
export { AppSlice } from './AppSlice';

/*This code exports two Redux slices, `PokemonSlice` and `AppSlice`, from separate files.

- `PokemonSlice` and `AppSlice` are Redux slices, each with its own set of actions and reducer functions to manage specific parts of the application state.

By exporting them with `export { PokemonSlice } from "./PokemonSlice";` and `export { AppSlice } from "./AppSlice";`, you make these slices available for use in other parts of your application. Other parts of your application can import and use the actions and state management provided by these slices to handle different aspects of your Redux store.

These exported slices can be combined and used in your Redux store configuration to manage the application's overall state and logic.*/
