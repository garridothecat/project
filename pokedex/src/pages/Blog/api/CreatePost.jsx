// eslint-disable-next-line react/prop-types

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import PostForm from '../components/PostForm';

import axios from 'axios';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const navigate = useNavigate();
	const { dispatch } = usePosts();

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/posts', { title, body });

			const data = response.data;
			console.log(data);

			dispatch({ type: 'ADD_POST', payload: data });

			// Redirecionar para a página principal ou mostrar mensagem de sucesso
			alert('novo post criado');
			navigate('/');
		} catch (error) {
			console.error('Erro ao criar post:', error);
		}
	};

	return (
		<>
			<PostForm action='create' id={null} title={title} body={body} onTitleChange={setTitle} onBodyChange={setBody} onSubmit={handleSubmit} />
		</>
	);
};

export default CreatePost;

/* Neste exemplo, adicionamos o uso do contexto de post, importado através do usePosts do PostContext. A função usePosts retorna a função dispatch do contexto.

No método handleSubmit, após criar o novo post no servidor, adicionamos o novo post ao estado posts do contexto através da ação ADD_POST e o payload data, que contém os detalhes do novo post.

Em seguida, chamamos a função dispatch com a ação ADD_POST e o payload data. Isso atualiza o estado posts no contexto. */

/**This code is a React component named `CreatePost` that's responsible for creating a new post. It uses various React and third-party libraries. Let's break down the code step by step:

1. **Import Statements:**
   ```javascript
   import { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { usePosts } from '../hooks/usePosts';
   import PostForm from '../components/PostForm';
   import axios from 'axios';
   ```

   - `useState`: Importing the `useState` hook from React to manage component-level state.
   - `useNavigate`: Importing `useNavigate` from 'react-router-dom' to programmatically navigate to different routes in the application.
   - `usePosts`: Importing a custom hook, likely part of a custom context, to manage posts in the application.
   - `PostForm`: Importing a custom component named `PostForm`.
   - `axios`: Importing the Axios library for making HTTP requests.

2. **Component Declaration:**
   ```javascript
   const CreatePost = () => {
   ```

   This code defines a functional React component called `CreatePost`.

3. **State Initialization:**
   ```javascript
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   ```

   The component uses the `useState` hook to initialize two pieces of local state: `title` and `body`, which are used to manage the title and body of the new post.

4. **Context and Dispatch:**
   ```javascript
   const navigate = useNavigate();
   const { dispatch } = usePosts();
   ```

   - `navigate` is set to the `useNavigate` hook to enable navigation in the application.
   - `dispatch` is destructured from the result of calling the `usePosts` hook, which is likely used to access and manipulate posts within the application's context.

5. **Form Submission:**
   ```javascript
   const handleSubmit = async e => {
     e.preventDefault();
     try {
       const response = await axios.post('http://localhost:5000/posts', { title, body });
       const data = response.data;

       dispatch({ type: 'ADD_POST', payload: data });
       alert('novo post criado');
       navigate('/');
     } catch (error) {
       console.error('Erro ao criar post:', error);
     }
   };
   ```

   - The `handleSubmit` function is an asynchronous function that is called when the form is submitted. It prevents the default form submission behavior.

   - It makes an HTTP POST request to 'http://localhost:5000/posts' with the `title` and `body` data provided as the request body. The response data is stored in the `data` variable.

   - It then dispatches an action 'ADD_POST' to update the state of posts (likely from the context) with the newly created post data (`data`).

   - An alert message is shown to indicate that a new post has been created.

   - Finally, the function uses the `navigate` object to navigate back to the main page (or the root route).

6. **Rendering the Component:**
   ```javascript
   return (
     <>
       <PostForm action='create' id={null} title={title} body={body} onTitleChange={setTitle} onBodyChange={setBody} onSubmit={handleSubmit} />
     </>
   );
   ```

   This code returns the `PostForm` component, passing in props like `action`, `id`, `title`, `body`, and callback functions to handle changes in the `title` and `body` inputs. The `onSubmit` prop is set to the `handleSubmit` function defined earlier, which handles the form submission.

Overall, this component is used for creating new posts in an application and relies on the Axios library for making API requests and a custom context (possibly involving Redux or another state management solution) to manage the state of posts. It also uses a custom `PostForm` component to render the form. */
