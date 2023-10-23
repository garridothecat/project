import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonsRoute } from "../../utils/constants";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const { data } = await axios.get(pokemonsRoute);
      return data.results;
    } catch (err) {
      console.error(err);
    }
  }
);
/*This TypeScript code defines another asynchronous Redux Thunk action creator, `getInitialPokemonData`, which is also part of a Redux store. This action is responsible for fetching initial Pokémon data from a remote API using Axios and populating the Redux store with that data.

Let's break down this code:

1. Import Statements:
   - The code imports `createAsyncThunk` from the Redux Toolkit, which is used to create asynchronous Redux action creators.
   - It also imports `axios`, a popular library for making HTTP requests, and a constant `pokemonsRoute` from a utilities file that likely holds API endpoints or other constants.

2. `getInitialPokemonData` Definition:
   - `getInitialPokemonData` is created using `createAsyncThunk`, specifying a unique name for this action: `"pokemon/initialData"`.

3. Async Function Parameters:
   - The async function defined for this action does not take any parameters.

4. Async Function Logic:
   - Inside the async function, the code attempts to make an HTTP GET request to the URL defined in `pokemonsRoute` using Axios.
   - It awaits the response, and once the data is received, it extracts the `results` property from the response data. This could be a list of Pokémon data.

   ```javascript
   const { data } = await axios.get(pokemonsRoute);
   return data.results;
   ```

   - If there's an error during the HTTP request or data extraction, the error is caught, and an error message is logged to the console.

     ```javascript
     } catch (err) {
       console.error(err);
     ```

So, this action, `getInitialPokemonData`, fetches data from a remote API (presumably related to Pokémon) and returns it as part of a Redux action. It's intended for initializing the store with the initial data and handling any errors that may occur during the fetching process. This action can be dispatched in your Redux application to trigger the data fetching process and update the application state with the received data.