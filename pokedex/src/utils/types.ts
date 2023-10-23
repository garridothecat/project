export interface AppTypeInitialState {
	isLoading: boolean;
	userInfo: undefined | { email: string };
	toasts: string[];
	currentPokemonTab: string;
}

export interface PokemonInitialStateType {
	allPokemon: undefined | genericPokemonType[];
	randomPokemons: generatedPokemonType[] | undefined;
	compareQueue: generatedPokemonType[];
	userPokemons: userPokemonsType[];
	currentPokemon: undefined | currentPokemonType;
}

export interface genericPokemonType {
	name: string;
	url: string;
}

export interface generatedPokemonType {
	name: string;
	id: number;
	image: string;
	types: pokemonTypeInterface[];
}

export interface userPokemonsType extends generatedPokemonType {
	firebaseId?: string;
}

export interface currentPokemonType {
	id: number;
	name: string;
	types: pokemonTypeInterface[];
	image: string;
	stats: pokemonStatsType[];
	encounters: string[];
	evolutionLevel: number;
	evolution: { level: number; pokemon: { name: string; url: string } }[];
	pokemonAbilities: { abilities: string[]; moves: string[] };
}

export interface pokemonStatsType {
	name: string;
	value: string;
}

export interface pokemonTypeInterface {
	[key: string]: {
		image: string;
		resistance: string[];
		strength: string[];
		weakness: string[];
		vulnerable: string[];
	};
}

export type pokemonStatType = 'vulnerable' | 'weakness' | 'strength' | 'resistance';

export type pokemonElementType =
	| 'bug'
	| 'dark'
	| 'dragon'
	| 'electric'
	| 'fairy'
	| 'fighting'
	| 'fire'
	| 'flying'
	| 'ghost'
	| 'grass'
	| 'ground'
	| 'ice'
	| 'normal'
	| 'poison'
	| 'psychic'
	| 'rock'
	| 'steel'
	| 'water';
/**This TypeScript code defines a set of interfaces and types for managing the state and data related to a Pokémon-themed application. Let's break down what each of these interfaces and types represents:

1. `AppTypeInitialState`:
   - Represents the initial state of the application.
   - It includes properties for handling loading state, user information, toasts, and the current Pokémon tab.

2. `PokemonInitialStateType`:
   - Represents the initial state related to Pokémon data.
   - It includes properties for storing all Pokémon, random Pokémon, a queue of Pokémon for comparison, user-owned Pokémon, and information about the current Pokémon.

3. `genericPokemonType`:
   - Represents a generic Pokémon with properties for name and URL.

4. `generatedPokemonType`:
   - Represents a Pokémon with properties like name, ID, image, and an array of types.

5. `userPokemonsType`:
   - Extends `generatedPokemonType` with an optional `firebaseId` property.

6. `currentPokemonType`:
   - Represents detailed information about a specific Pokémon, including its ID, name, types, image, stats, encounters, evolution details, and abilities/moves.

7. `pokemonStatsType`:
   - Represents the stats of a Pokémon, including the name of the stat and its value.

8. `pokemonTypeInterface`:
   - Defines the structure of a Pokémon type, including an image, resistance, strength, weakness, and vulnerabilities.

9. `pokemonStatType`:
   - A type representing different aspects of Pokémon stats, such as "vulnerable," "weakness," "strength," and "resistance."

10. `pokemonElementType`:
    - A type representing various Pokémon types, including "bug," "dark," "dragon," and others.

These interfaces and types are likely used to define the structure of data and state within a Pokémon-related application. For example, you can use these types to manage the data for different Pokémon, their types, and their interactions within the application. The TypeScript type system can help ensure that your application code adheres to the defined data structures, reducing the risk of runtime errors and making your code more robust and self-documenting. */
