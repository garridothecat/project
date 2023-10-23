import React from 'react';
import { IoGitCompare } from 'react-icons/io5';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { addToCompare, setCurrentPokemon } from '../app/slices/PokemonSlice';
import { useAppDispatch } from '../app/hooks';
import { removePokemonFromUserList } from '../app/reducers/removePokemonFromUserList';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPokemonTab, setToast } from '../app/slices/AppSlice';
import { addPokemonToList } from '../app/reducers/addPokemonToList';
import { pokemonTabs } from '../utils/constants';
import { pokemonTypeInterface, userPokemonsType } from '../utils/types';
function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className='pokemon-card-grid-container'>
			<div className='pokemon-card-grid'>
				{pokemons &&
					pokemons.length > 0 &&
					pokemons?.map((data: userPokemonsType) => {
						return (
							<div key={data.id} className='pokemon-card'>
								<div className='pokemon-card-list'>
									{location.pathname.includes('/pokemon') ? (
										<FaPlus className='plus' onClick={() => dispatch(addPokemonToList(data))} />
									) : location.pathname.includes('/search') ? (
										<FaPlus className='plus' onClick={() => dispatch(addPokemonToList(data))} />
									) : (
										<FaTrash
											className='trash'
											onClick={async () => {
												await dispatch(removePokemonFromUserList({ id: data.firebaseId! }));
												dispatch(setToast('Pokemon Removed Successfully.'));
											}}
										/>
									)}
								</div>
								<div className='pokemon-card-compare'>
									<IoGitCompare
										onClick={() => {
											dispatch(addToCompare(data));
											dispatch(setToast(`${data.name} has been added to compare queue.`));
										}}
									/>
								</div>
								<h3 className='pokemon-card-title'>{data.name}</h3>
								<img
									src={data.image}
									alt=''
									className='pokemon-card-image'
									loading='lazy'
									onClick={() => {
										dispatch(setPokemonTab(pokemonTabs.description));
										dispatch(setCurrentPokemon(undefined));
										navigate(`/pokemon/${data.id}`);
									}}
								/>
								<div className='pokemon-card-types'>
									{data.types.map((type: pokemonTypeInterface, index: number) => {
										const keys = Object.keys(type);
										return (
											<div className='pokemon-card-types-type' key={index}>
												<img src={type[keys[0]].image} alt='pokemon type' className='pokemon-card-types-type-image' loading='lazy' />
												<h6 className='pokemon-card-types-type-text'>{keys[0]}</h6>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default PokemonCardGrid;

/**The provided code is a React functional component called `PokemonCardGrid`. This component is responsible for rendering a grid of Pokémon cards based on the data provided as `pokemons`. Each card contains information about a Pokémon, and the behavior of certain elements on the card depends on the current route (location) in the application. Let's break down the code:

1. **Imports**:
   - The code includes several import statements for various dependencies, such as React Icons, Redux actions and dispatch, and utility functions related to navigation in a React application.

2. **Function Declaration**:
   - The `PokemonCardGrid` function is declared as a functional component.

3. **Function Body**:
   - Inside the `PokemonCardGrid` function, the component is defined.

4. **Component Render**:
   - The component returns JSX elements, which include a container and a grid of Pokémon cards.
   - The grid is generated based on the `pokemons` array, which is passed as a prop to the component.

5. **Looping Through Pokémon Data**:
   - The component uses the `.map` method to iterate over the `pokemons` array and generate a Pokémon card for each item in the array.

6. **Conditional Rendering**:
   - The behavior of some elements on the Pokémon card depends on the current route, which is determined using the `location` object provided by the `useLocation` hook.

   - If the route includes "/pokemon" or "/search," a "plus" icon (`FaPlus`) is rendered to add the Pokémon to a list.
   - If the route is different (i.e., not "/pokemon" or "/search"), a "trash" icon (`FaTrash`) is rendered to remove the Pokémon from the user's list.

7. **Card Details**:
   - Each Pokémon card displays the Pokémon's name, image, and a list of its types.

8. **Click Events**:
   - The Pokémon card's image is clickable. When clicked, it updates the route, sets the current Pokémon, and navigates to the detailed view of that Pokémon.

   - The "compare" icon (`IoGitCompare`) allows users to add the Pokémon to a comparison queue.

9. **Actions Dispatched**:
   - Several Redux actions are dispatched throughout the component. These actions are used to manage the state of the application, including adding Pokémon to a list, removing Pokémon, and displaying toast messages.

10. **Export**:
   - The `PokemonCardGrid` component is exported as the default export of this module, making it available for use in other parts of the application.

This component appears to be a versatile component for rendering Pokémon cards with different behaviors depending on the context of the application, making it useful for various parts of a Pokémon-related application. */
