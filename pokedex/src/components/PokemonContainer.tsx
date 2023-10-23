import React from 'react';
// import balbasaur from "../assets/balbasaur.png";
// import pikachu from "../assets/pikachu.png";
// import charlizard from "../assets/charlizard.png";

export default function PokemonContainer({ image }: { image: string }) {
	return (
		<>
			<div className='circle-container'>
				<div className='outer-circle'>
					<div className='inner-circle'>
						<img src={image} alt='' />
					</div>
					<div className='lines'>
						<div className='line line-1'></div>
						<div className='line line-2'></div>
					</div>
				</div>
			</div>
			{/* <div className="circle-container circle-container-2">
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={pikachu} alt="" />
          </div>
          <div className="lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>
      </div>
      <div className="circle-container circle-container-3">
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={charlizard} alt="" />
          </div>
          <div className="lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>
      </div> */}
		</>
	);
}

/**The provided code is a React functional component called `PokemonContainer`. This component appears to be designed to display a circular container with an image inside it. The component accepts an `image` prop, which should be a string representing the image source to be displayed within the container. Here's a breakdown of the code:

1. **Imports**:
   - The component doesn't have any imports, but there are commented-out import statements for specific images (e.g., `balbasaur`, `pikachu`, and `charlizard`) that were likely used for testing or placeholders.

2. **Function Declaration**:
   - The `PokemonContainer` function is declared as a functional component.

3. **Function Body**:
   - Inside the `PokemonContainer` function, the component is defined.

4. **JSX Elements**:
   - The component returns a JSX structure that represents a circular container for displaying an image. This structure consists of several nested `<div>` elements with specific class names and an `<img>` element for the image.
   - The structure includes an outer circle, an inner circle, and two lines.

5. **Props**:
   - The component receives a single prop named `image`, which is a string representing the image source. The `image` prop is used as the `src` attribute for the `<img>` element to display the specified image inside the circular container.

6. **Commented-Out Code**:
   - There are commented-out sections of code for two additional circular containers (`circle-container-2` and `circle-container-3`) with their respective images (`pikachu` and `charlizard`). These sections were likely used for testing or may have been intended to display multiple images in different containers.

The main functionality of this component is to display an image inside a circular container. It can be used to present Pokémon images or any other circular image displays based on the `image` prop provided when using the component. To display multiple images in different containers, you can uncomment and customize the additional sections of code. */
