/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

// 2. Defina o reducer
import { postReducer } from './Reducer';

// 1. Criar o contexto
export const PostContext = createContext();

// 3. Defina o provider
export const PostProvider = ({ children }) => {
	const [state, dispatch] = useReducer(postReducer, []);

	return <PostContext.Provider value={{ posts: state, dispatch }}>{children}</PostContext.Provider>;
};

/* Envolver o seu aplicativo com o PostProvider (app.jsx). */

/**The code you've provided sets up a React context for managing posts in your application using the `useContext` and `useReducer` hooks. Here's a breakdown of the code:

1. **Context Creation:**
   ```javascript
   export const PostContext = createContext();
   ```

   This code creates a context named `PostContext`. Context is a built-in feature in React used for sharing state or other data among components without having to explicitly pass props through each level of the component tree.

2. **Reducer Import:**
   ```javascript
   import { postReducer } from './Reducer';
   ```

   This code imports a reducer function named `postReducer` from a file named `'Reducer'`. A reducer is typically used to manage and update the state stored in the context.

3. **Provider Definition:**
   ```javascript
   export const PostProvider = ({ children }) => {
     const [state, dispatch] = useReducer(postReducer, []);
     return <PostContext.Provider value={{ posts: state, dispatch }}>{children}</PostContext.Provider>;
   };
   ```

   - `PostProvider` is a component that serves as the provider for the `PostContext`. It takes a single prop, `children`, which represents the child components that will be wrapped by this provider.

   - Inside `PostProvider`, it uses the `useReducer` hook to create a state and a dispatch function. The `postReducer` function is used to manage the state, and the initial state is set to an empty array `[]`.

   - It then wraps the child components (`{children}`) with the `PostContext.Provider`. The `value` prop provides two values to the context: `posts` (the state) and `dispatch` (the dispatch function).

4. **Usage Recommendation:**
   The code comments suggest that you should wrap your entire application with the `PostProvider` component. To do this, you would typically wrap your root component (e.g., `App`) with the `PostProvider` component in your application's entry point (e.g., `app.jsx`):

   ```javascript
   // Import statements here

   function App() {
     // Your main application component here
   }

   ReactDOM.render(
     <PostProvider>
       <App />
     </PostProvider>,
     document.getElementById('root')
   );
   ```

   This way, the context and its associated state and dispatch function will be available to all components within your application, and they can use the `useContext` hook to access and update the state.

Overall, this code provides a structure for managing post-related state in your React application using context and a reducer. It's a common pattern for centralizing and managing global state in complex applications, especially when multiple components need access to the same data. The `PostProvider` wraps your app, making this global state accessible throughout your component tree. */
