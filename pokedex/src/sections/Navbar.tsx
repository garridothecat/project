import React, { useEffect } from 'react';
import pokeballIcon from '../assets/pokeball-icon.png';
import { Link, useLocation } from 'react-router-dom';
import { resetRandomPokemons } from '../app/slices/PokemonSlice';
import { useAppDispatch } from '../app/hooks';

export default function Navbar() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const navigationRoutes = [
		{
			name: 'Search',
			route: '/search',
		},
		{
			name: 'Compare',
			route: '/compare',
		},
		{
			name: 'Pokemon',
			route: '/pokemon',
		},
		{
			name: 'My List',
			route: '/list',
		},
		{
			name: 'About',
			route: '/about',
		},
		{
			name: 'Blog',
			route: '/blog',
		},
	];
	const location = useLocation();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const index = navigationRoutes.findIndex(({ route }) => location.pathname.includes(route));
		ul(index);
	}, [location.pathname, navigationRoutes]);

	function ul(index: number) {
		var underlines = document.querySelectorAll<HTMLElement>('.underline');
		for (var i = 0; i < underlines.length; i++) {
			underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
		}
	}

	return (
		<nav>
			<div className='block'>
				<Link to='/search'>
					<img
						src={pokeballIcon}
						alt=''
						onClick={() => {
							dispatch(resetRandomPokemons());
						}}
					/>
				</Link>
			</div>
			<div className='data'>
				<ul>
					<div className='underline'></div>
					<div className='underline'></div>
					<div className='underline'></div>
					{navigationRoutes.map(({ name, route }, index) => {
						return (
							<Link to={route} key={index} onClick={e => dispatch(resetRandomPokemons())}>
								<li>{name}</li>
							</Link>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

/**The provided code is a React functional component called "Navbar." This component represents the navigation bar of a web application and includes navigation links to different sections of the application. Let's break down the key elements of this code:

1. **Imports**: The code imports React, custom assets (e.g., `pokeballIcon`), and dependencies from `react-router-dom`. It also imports Redux-related functions, specifically the `resetRandomPokemons` action, and uses the `useAppDispatch` hook to dispatch actions.

2. **Navigation Routes**: The `navigationRoutes` array defines an array of objects, each containing a `name` and a `route`. These objects represent the available navigation links in the application. The `name` represents the link's text, and the `route` represents the associated URL path.

3. **Location**: The `useLocation` hook is used to determine the current location (URL) in the application. This allows the component to highlight the active link based on the current URL.

4. **UseEffect**: The `useEffect` hook is used to set up the initial state of the navigation links. It calculates the active link based on the current location and invokes the `ul` function to set the style of the underline elements.

5. **Underline Styling (ul Function)**: The `ul` function sets the style of underline elements based on the active link. It uses the `transform` CSS property to move the underline element horizontally to align with the active link.

6. **Rendering**: The component's render method returns JSX code, which defines the structure and content of the navigation bar. It includes:
   - A navigation bar containing two main sections:
     - The left "block" that contains a link to the "/search" route. It includes an image (pokeballIcon) and a click event handler to reset random Pokémon data using the `resetRandomPokemons` action.
     - The central "data" section that contains a list of navigation links. Each link is wrapped in an `<Link>` component from `react-router-dom` and includes a `<li>` element with the navigation name. The active link is determined by the `location` variable, and when a link is clicked, the `resetRandomPokemons` action is dispatched to reset random Pokémon data.

In summary, the "Navbar" component represents the navigation bar of the application and provides navigation links to different sections. It highlights the active link based on the current URL and includes an icon that resets random Pokémon data when clicked. The component uses `react-router-dom` for routing and Redux for state management. */
