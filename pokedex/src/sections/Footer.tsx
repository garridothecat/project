import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPokemonTab, setToast, setUserStatus } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/constants';

export default function Footer() {
	const location = useLocation();
	const currentPokemonTab = useAppSelector(({ app: { currentPokemonTab } }) => currentPokemonTab);
	const dispatch = useAppDispatch();
	const logOutUser = () => {
		signOut(firebaseAuth);
		dispatch(setUserStatus(undefined));
		dispatch(setToast('Logged out successfully from Firebase'));
	};
	const routes = [
		{
			name: pokemonTabs.description,
			value: 'Description',
		},
		{
			name: pokemonTabs.evolution,
			value: 'Evolution',
		},
		{
			name: pokemonTabs.locations,
			value: 'Catching',
		},
		{
			name: pokemonTabs.moves,
			value: 'Capable Moves',
		},
	];
	return (
		<footer>
			<div className='block'></div>
			<div className='data'>
				{location.pathname.includes('/pokemon') && (
					<ul>
						{routes.map(route => (
							<li key={route.name} className={`${currentPokemonTab === route.name ? 'active' : ''}`} onClick={() => dispatch(setPokemonTab(route.name))}>
								{route.value}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className='block'>
				<MdOutlinePowerSettingsNew onClick={logOutUser} />
			</div>
		</footer>
	);
}

/**The provided code is a React functional component called "Footer." This component appears to represent the footer section of a web application. It includes navigation links related to Pokémon data and a sign-out feature. Here are the key elements of this code:

1. **Imports**: The code imports several dependencies, including React, icons from "react-icons/md" (specifically the power settings icon), and functions from Firebase, such as `signOut`. It also imports custom functions and Redux-related functions and actions.

2. **State Management**: The component uses the Redux store for state management. It extracts the `currentPokemonTab` state variable using the `useAppSelector` hook. It also uses the `useAppDispatch` hook to dispatch actions to update the state.

3. **Log Out Function**: The `logOutUser` function is used to log the user out of the application by calling the `signOut` function from Firebase. After signing out, it dispatches actions to update the user's status and display a toast message indicating a successful logout.

4. **Routes Configuration**: The `routes` variable defines an array of route objects. Each object has a `name` and a `value`. These route objects represent the available tabs or sections in the application, such as "Description," "Evolution," "Catching," and "Capable Moves."

5. **Render Method**: The component's render method returns JSX code, which defines the structure and content of the footer:
   - The footer contains three main sections:
     - The left "block" is an empty section.
     - The central "data" section contains navigation links based on the current route. These links are rendered if the current location (URL) includes "/pokemon." A list of navigation links is generated from the `routes` array, and each link corresponds to a specific tab or section. The `currentPokemonTab` determines which link is currently active.
     - The right "block" contains a power settings icon (a logout button) that, when clicked, triggers the `logOutUser` function to sign the user out.

In summary, the "Footer" component is designed for the footer section of the web application. It includes navigation links related to Pokémon data tabs and provides a logout button. It uses Redux for state management and Firebase for user authentication. When on a "pokemon" page, it displays navigation links for the specific Pokémon-related tabs. */
