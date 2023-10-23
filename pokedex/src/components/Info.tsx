import React, { useEffect } from 'react';
import { pokemonTypes } from '../utils';
import { useAppDispatch } from '../app/hooks';
import { addPokemonToList } from '../app/reducers/addPokemonToList';
import { setPokemonTab } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/constants';
import { currentPokemonType, pokemonStatsType } from '../utils/types';

export default function Info({ data }: { data: currentPokemonType | undefined }) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const progressBars = document.querySelectorAll('progress');
		progressBars.forEach(progressBar => {
			progressBar.style.width = '10rem';
		});
	}, []);
	const createStatsArray = (types: string[], statType: string) => {
		const statsSet = new Set();
		types.forEach((type: string) => {
			// @ts-ignore
			pokemonTypes[type][statType].forEach((stat: string) => {
				if (!statsSet.has(stat)) {
					statsSet.add(stat[0].toUpperCase() + stat.slice(1));
				}
			});
		});
		return Array.from(statsSet);
	};
	return (
		<>
			<div className='details'>
				<h1 className='name'>{data?.name}</h1>
				<h3>Type: {data?.types.join(' - ')}</h3>
				<h3>Evolution: {data?.evolutionLevel}</h3>
				<button onClick={() => dispatch(setPokemonTab(pokemonTabs.evolution))}>See next evolution</button>
			</div>
			<div className='stats'>
				<ul>
					{data?.stats.map((stat: pokemonStatsType) => {
						return (
							<li key={stat.name}>
								{stat.name}: {stat.value}
								<progress max={100} value={stat.value} />
							</li>
						);
					})}
				</ul>
			</div>
			<div className='battle-stats'>
				{
					<ul>
						<li>
							<span>Strengths:</span>
							<span>{createStatsArray(data?.types as unknown as string[], 'strength').join(', ')}</span>
						</li>
						<li>
							<span>Weakness:</span>
							<span>{createStatsArray(data?.types as unknown as string[], 'weakness').join(', ')}</span>
						</li>
						<li>
							<span>Resistant:</span>
							<span>{createStatsArray(data?.types as unknown as string[], 'resistance').join(', ')}</span>
						</li>
						<li>
							<span>Vulnerable:</span>
							<span>{createStatsArray(data?.types as unknown as string[], 'vulnerable').join(', ')}</span>
						</li>
					</ul>
				}
				<button onClick={() => dispatch(addPokemonToList(data!))} className='add-pokemon'>
					Add Pokemon
				</button>
			</div>
		</>
	);
}

/**The provided code is another React functional component written in TypeScript. This component appears to be responsible for displaying detailed information about a Pokémon, such as its name, types, stats, strengths, weaknesses, and other details. Let's break down the code:

1. **Imports**:
   - React and various functions/types/constants from other parts of the application are imported using ES6 `import` statements.

2. **Function Declaration**:
   - The `Info` function is declared, which takes an object as a parameter with a single property named `data`. `data` is of type `currentPokemonType | undefined`, meaning it can either be an object of `currentPokemonType` or `undefined`.

3. **Function Body**:
   - Inside the `Info` function, the component is defined.

4. **`useEffect`**:
   - The `useEffect` hook is used to perform side effects in the component. In this case, it selects all `<progress>` elements in the component and sets their `style.width` property to "10rem". This likely affects the appearance of progress bars.

5. **`createStatsArray` Function**:
   - The `createStatsArray` function is defined, which takes an array of strings `types` and a string `statType` as arguments. It processes the provided types and extracts stats (strength, weakness, resistance, or vulnerability). The function returns an array of unique, capitalized stat names.

6. **Component Render**:
   - The component returns JSX elements that make up the user interface. It's divided into three main sections:
     - **Details**: Displays the Pokémon's name, types, evolution level, and a button to see the next evolution.
     - **Stats**: Displays the Pokémon's stats in an unordered list with progress bars.
     - **Battle Stats**: Displays a list of the Pokémon's strengths, weaknesses, resistances, and vulnerabilities. It also includes a button to add the Pokémon to a list.

7. **Interpolated Values**:
   - Throughout the component, values from the `data` object (if it exists) are interpolated within the JSX to display information about the Pokémon. For example, `{data?.name}` is used to display the Pokémon's name.

8. **Conditional Rendering**:
   - Conditional rendering is used in the component. For example, the button to see the next evolution is only displayed if `data` is not `undefined`. Similarly, the button to add the Pokémon is only displayed if `data` is not `undefined`.

Overall, this component is responsible for presenting detailed information about a Pokémon, including its name, types, stats, strengths, weaknesses, resistances, vulnerabilities, and evolution information. It also provides interaction options to add the Pokémon to a list and see its next evolution. */
