// @ts-nocheck
const fetchImages = (context: string) => {
	const images = {};
	const cache = {};
	function importAll(r) {
		r.keys().forEach(key => (cache[key] = r(key)));
	}
	importAll(context);
	Object.entries(cache).forEach((module: string[]) => {
		let key = module[0].split('');
		key.splice(0, 2);
		key.splice(-4, 4);
		images[[key.join('')]] = module[1];
	});
	return images;
};

export const images = fetchImages(require.context('../assets/pokemons/shiny', false, /\.(png|jpe?g|svg)$/));
export const defaultImages = fetchImages(require.context('../assets/pokemons/default', false, /\.(png|jpe?g|svg)$/));

/**This TypeScript code defines a function called `fetchImages` and exports two objects, `images` and `defaultImages`, which are created by calling `fetchImages` with different contexts. It appears that the code is meant to fetch and organize images from specific directories in your project.

Here's a breakdown of the code:

1. `// @ts-nocheck`: This comment indicates that TypeScript type checking is turned off for the entire file or module.

2. `fetchImages` Function:
   - This function takes a `context` parameter, which should be a Webpack context obtained using `require.context`. Contexts are used to dynamically import files within a specific directory.

   - Inside the function, an `images` object and a `cache` object are initialized to store image data.

   - The `importAll` function is defined to populate the `cache` object with the contents of the specified context. It loops through the files in the context and stores them in the `cache` object.

   - After populating the `cache` object, the code processes each module in the cache:
     - It removes the first two characters from the module's key (usually './') and the file extension (last 4 characters) to extract a clean key.
     - It then assigns the corresponding module (image data) to this key in the `images` object.

   - Finally, the `images` object is returned.

3. Exported Objects:
   - `images`: This exports an object obtained by calling `fetchImages` with a specific context that points to files in the "../assets/pokemons/shiny" directory with the extensions ".png," ".jpg," and ".svg." This object likely contains the image data for shiny Pokémon.

   - `defaultImages`: This exports another object obtained by calling `fetchImages` with a context that points to files in the "../assets/pokemons/default" directory with the same specified extensions. This object likely contains the image data for default (non-shiny) Pokémon.

These exported objects provide a way to access and use the image data for different Pokémon types in your project. The use of `@ts-nocheck` suggests that TypeScript type checking for this code is disabled, possibly due to the dynamic nature of importing files using Webpack contexts. Make sure that the file paths and directory structures match the actual project structure for the code to work as expected. */
