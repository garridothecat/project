import React from 'react';
import Wrapper from '../sections/Wrapper';
import CompareContainer from '../components/CompareContainer';
import { useAppSelector } from '../app/hooks';

function Compare() {
	const { compareQueue } = useAppSelector(({ pokemon }) => pokemon);
	return (
		<div className='compare'>
			<CompareContainer pokemon={compareQueue[0]} isEmpty={compareQueue.length < 1} />
			<CompareContainer pokemon={compareQueue[1]} isEmpty={compareQueue.length < 2} />
		</div>
	);
}

export default Wrapper(Compare);

/**The provided code is a React component called "Compare." This component is part of a larger web application and is used for comparing Pokémon. Let's break down the key elements of this code:

1. **React and Dependencies**: The code imports React, as well as several custom components, including `Wrapper` and `CompareContainer`. It also imports the `useAppSelector` hook from "../app/hooks," which is used to access the Redux store's state.

2. **State Access**: Inside the `Compare` component, it uses the `useAppSelector` hook to access the Redux state. Specifically, it extracts the `compareQueue` property from the `pokemon` slice of the Redux store. This suggests that the component is intended to display a comparison between Pokémon that have been added to the compare queue.

3. **Rendering**: The component's render method returns JSX (JavaScript XML) code, which defines the structure and content of the component's user interface. It includes:
   - A `<div>` element with the class name "compare." This is a container for the comparison section.

   - Two instances of the `CompareContainer` component. Each `CompareContainer` component receives two props:
     - `pokemon`: This prop is set to the first and second elements in the `compareQueue` array (i.e., `compareQueue[0]` and `compareQueue[1]`).
     - `isEmpty`: This prop is set based on whether there are Pokémon in the `compareQueue` array. If there are fewer than 1 Pokémon in the queue, the first comparison container has `isEmpty` set to `true`, and if there are fewer than 2 Pokémon in the queue, the second comparison container has `isEmpty` set to `true`. These props likely control the display of comparison information and indicate whether there are enough Pokémon for comparison.

4. **Export**: The component is exported as the default export of the module. Additionally, it is wrapped with the `Wrapper` component. This suggests that the `Wrapper` component may provide additional functionality, styling, or layout to the "Compare" component. `Wrapper` is likely a higher-order component (HOC).

In summary, the "Compare" component is designed for comparing Pokémon. It accesses the relevant data from the Redux store, specifically the `compareQueue`, and then renders two `CompareContainer` components to display information about the first and second Pokémon in the queue. The `Wrapper` component is used to enhance or style the "Compare" component, and it's part of a larger web application or website focused on Pokémon-related content. */
