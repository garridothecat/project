// @ts-nocheck
export { debounce } from './debounce';
export { pokemonTypes } from './pokemonTypes';
export { defaultImages, images } from './pokemonImages';

/**It seems like you are exporting various modules or objects from different files in your TypeScript (TS) project. Here's a brief explanation of what each export statement is doing:

1. `export { debounce } from "./debounce";`
   - This statement exports the `debounce` function from a file named `"debounce"`. The comment `// @ts-nocheck` indicates that TypeScript type checking is disabled for this module, meaning that TypeScript will not perform type checks for the exported `debounce` function.

2. `export { pokemonTypes } from "./pokemonTypes";`
   - This statement exports the `pokemonTypes` object from a file named `"pokemonTypes"`. Like the previous statement, type checking is disabled for this module.

3. `export { defaultImages, images } from "./pokemonImages";`
   - This statement exports the `defaultImages` and `images` objects from a file named `"pokemonImages"`. As with the other exports, type checking is disabled for this module.

The use of `// @ts-nocheck` indicates that TypeScript type checking is turned off for the entire file or module. This may be necessary if you are dealing with JavaScript code in a TypeScript project, or if you have specific reasons to bypass type checking for certain parts of your code.

Make sure that the imported items and their types align with your project's requirements, as disabling type checking may lead to potential type-related issues if not managed carefully. */
