import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import PostForm from '../components/PostForm';

import axios from 'axios';

const UpdatePost = () => {
	const { id: postId } = useParams();
	const id = Number(postId);
	const navigate = useNavigate();
	const { dispatch } = usePosts();

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/posts/${id}`);
				const post = response.data;

				setTitle(post.title);
				setBody(post.body);
			} catch (error) {
				console.error('Erro ao buscar post:', error);
			}
		};

		fetchPost();
	}, [id]);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await axios.put(`http://localhost:5000/posts/${id}`, {
				title,
				body,
			});

			const updatedPost = response.data;

			dispatch({ type: 'UPDATE_POST', payload: updatedPost });

			// Redirecionar para a página principal ou mostrar mensagem de sucesso
			alert('post atualizado');
			navigate('/');
		} catch (error) {
			console.error('Erro ao atualizar post:', error);
		}
	};

	return <PostForm action='update' id={id} title={title} body={body} onTitleChange={setTitle} onBodyChange={setBody} onSubmit={handleSubmit} />;
};

export default UpdatePost;

/* Neste exemplo, foi adicionado o uso do contexto de post, que foi importado através do usePosts do PostContext. A função usePosts retorna o estado posts e a função dispatch do contexto. O estado posts contém todos os posts, e a função dispatch é usada para enviar a ação de atualização para o reducer.

No useEffect, verificamos se o post já está presente no estado posts do contexto. Se estiver presente, pegamos os dados do post diretamente do estado. Caso contrário, fazemos uma chamada para buscar o post no servidor.

Após a atualização do post, chamamos a função dispatch com a ação UPDATE_POST e o post atualizado como payload. Isso atualiza o estado posts no contexto. */
/**The provided code is a React component called `UpdatePost` that is used for updating an existing post. It utilizes various React hooks, the React Router, Axios for making HTTP requests, and likely a custom context (possibly managed using Redux or another state management solution). Here's a breakdown of the code:

1. **Import Statements:**
   ```javascript
   import { useState, useEffect } from 'react';
   import { useParams, useNavigate } from 'react-router-dom';
   import { usePosts } from '../hooks/usePosts';
   import PostForm from '../components/PostForm';
   import axios from 'axios';
   ```

   - `useState`: Importing the `useState` hook from React to manage component-level state.
   - `useEffect`: Importing the `useEffect` hook from React to manage side effects.
   - `useParams`: Importing `useParams` from 'react-router-dom' to access route parameters.
   - `useNavigate`: Importing `useNavigate` from 'react-router-dom' to programmatically navigate to different routes.
   - `usePosts`: Importing a custom hook, presumably part of a custom context, to manage posts in the application.
   - `PostForm`: Importing a custom component named `PostForm`.
   - `axios`: Importing the Axios library for making HTTP requests.

2. **Component Declaration:**
   ```javascript
   const UpdatePost = () => {
   ```

   This code defines a functional React component named `UpdatePost`.

3. **Accessing Route Parameters:**
   ```javascript
   const { id: postId } = useParams();
   const id = Number(postId);
   ```

   It uses `useParams` to extract the `id` parameter from the route, then converts it into a number (assuming it's meant to be a numeric identifier for the post to update).

4. **Context and Dispatch:**
   ```javascript
   const navigate = useNavigate();
   const { dispatch } = usePosts();
   ```

   - `navigate` is set to the `useNavigate` hook, which allows navigation within the application.
   - `dispatch` is destructured from the result of calling the `usePosts` hook, which is used to access and manipulate posts within the application's context.

5. **State Initialization:**
   ```javascript
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   ```

   The component uses the `useState` hook to initialize two local state variables: `title` and `body`, which are used to manage the title and body of the post that is being updated.

6. **Fetching Post Details with `useEffect`:**
   ```javascript
   useEffect(() => {
     const fetchPost = async () => {
       try {
         const response = await axios.get(`http://localhost:5000/posts/${id}`);
         const post = response.data;

         setTitle(post.title);
         setBody(post.body);
       } catch (error) {
         console.error('Erro ao buscar post:', error);
       }
     };

     fetchPost();
   }, [id]);
   ```

   - This `useEffect` runs when the component mounts and whenever the `id` parameter changes.

   - It sends an Axios GET request to retrieve post details from the server based on the provided `id`. The response data is used to set the `title` and `body` in the local state.

   - If there's an error during the request, it's logged to the console.

7. **Update Post Function:**
   ```javascript
   const handleSubmit = async e => {
     e.preventDefault();

     try {
       const response = await axios.put(`http://localhost:5000/posts/${id}`, {
         title,
         body,
       });

       const updatedPost = response.data;

       dispatch({ type: 'UPDATE_POST', payload: updatedPost });

       alert('post atualizado');
       navigate('/');
     } catch (error) {
       console.error('Erro ao atualizar post:', error);
     }
   };
   ```

   - `handleSubmit` is an asynchronous function that is called when the form (rendered by `PostForm`) is submitted. It handles the update of the post.

   - It sends an Axios PUT request to update the post on the server based on the provided `id`. The `title` and `body` are sent in the request body.

   - After a successful update, it dispatches an action 'UPDATE_POST' with the updated post data to update the state of posts, likely within the context.

   - An alert message is shown to indicate that the post has been updated.

   - Finally, it uses `navigate` to navigate back to the main page (or the root route).

8. **Rendering the Component:**
   ```javascript
   return <PostForm action='update' id={id} title={title} body={body} onTitleChange={setTitle} onBodyChange={setBody} onSubmit={handleSubmit} />;
   ```

   The component returns a `PostForm` with props set for an update action. It passes the `id`, `title`, and `body` from the fetched post data. Callback functions are provided for `onTitleChange` and `onBodyChange`, and the `onSubmit` is set to `handleSubmit`.

This component is used to update an existing post in the application and relies on Axios for making API requests and a custom context (likely managed using Redux or a similar state management solution) to manage the state of posts. It also uses a custom `PostForm` component to render the form. */
