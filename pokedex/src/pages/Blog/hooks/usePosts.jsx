import { useContext } from 'react';
import { PostContext } from '../context/Context';

// Hook personalizado para facilitar o uso do contexto
const usePosts = () => useContext(PostContext);

export { usePosts };

/**The code you've provided defines a custom hook named `usePosts` that simplifies the usage of the `PostContext` context in your React application. Here's a breakdown of this code:

1. **Import Statements:**
   ```javascript
   import { useContext } from 'react';
   import { PostContext } from '../context/Context';
   ```

   - `useContext` is imported from React to access the context.
   - `PostContext` is imported from the `../context/Context` module. This is the context you've previously defined.

2. **Custom Hook:**
   ```javascript
   const usePosts = () => useContext(PostContext);
   ```

   - `usePosts` is a custom hook created using the `useContext` hook. It is designed to facilitate the use of the `PostContext` context.

   - When you call `usePosts`, it essentially invokes `useContext(PostContext)`, which retrieves the current context value provided by the `PostContext.Provider`. This is a common pattern for accessing context values within functional components.

3. **Exporting the Custom Hook:**
   ```javascript
   export { usePosts };
   ```

   - The `usePosts` custom hook is exported, making it available for use in other parts of your application.

With this custom hook, you can easily access the `PostContext` and its associated state and dispatch function from any functional component. For example, you can use it like this in your components:

```javascript
import { usePosts } from '../hooks/usePosts';

function MyComponent() {
  const { posts, dispatch } = usePosts();

  // Use the 'posts' and 'dispatch' values from the context as needed

  return (
    // JSX content
  );
}
```

This makes it more convenient to work with the context within your components, as you don't need to explicitly call `useContext(PostContext)` each time you want to access the context's data. */
