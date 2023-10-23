export const pokemonAPI = 'https://pokeapi.co/api/v2';
export const pokemonsRoute = `${pokemonAPI}/pokemon?limit=5000`;
export const pokemonRoute = `${pokemonAPI}/pokemon`;
export const pokemonSpeciesRoute = `${pokemonAPI}/pokemon-species`;

export const pokemonTabs = {
	description: 'description',
	evolution: 'evolution',
	locations: 'locations',
	moves: 'moves',
};

/**This code defines several constants that appear to be related to an application's configuration, specifically for working with Pokémon data. Let's break down these constants:

1. `pokemonAPI`:
   - This constant holds the base URL for a Pokémon API. It points to the root of the API from which various Pokémon-related data can be retrieved.

2. `pokemonsRoute`:
   - This constant is used to construct a specific route for fetching Pokémon data. It includes a query parameter `limit=5000`, which suggests that this route might be used to retrieve a list of up to 5000 Pokémon from the API.

3. `pokemonRoute`:
   - This constant is used to construct a route for fetching individual Pokémon data. It's likely used to retrieve detailed information about a specific Pokémon based on its unique identifier.

4. `pokemonSpeciesRoute`:
   - This constant is used to construct a route for fetching Pokémon species data. Pokémon species data typically includes information about the different forms and evolutions of a Pokémon.

5. `pokemonTabs`:
   - This constant defines an object that contains keys related to different tabs or sections in a Pokémon-related user interface. The keys represent the names of these tabs, and the values are string identifiers for each tab. These tabs are likely used to navigate and display different aspects of Pokémon information within the application.

These constants are helpful for centralizing and organizing URLs, route paths, and tab names related to Pokémon data. They make it easier to manage and update these values throughout the application and provide a clean way to reference these configurations in different parts of the code. */
