import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

import axios from 'axios';

import PostForm from '../components/PostForm';

const DeletePost = () => {
	const { id: postId } = useParams();
	const id = Number(postId);
	const navigate = useNavigate();
	const { dispatch } = usePosts();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/posts/${id}`);
				setPost(response.data);
			} catch (error) {
				console.error('Erro ao buscar detalhes do post:', error);
			}
		};

		fetchPost();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:5000/posts/${id}`);

			dispatch({ type: 'DELETE_POST', payload: id });

			alert('post apagado');
			navigate('/');
		} catch (error) {
			console.error('Erro ao deletar post:', error);
		}
	};

	if (!post) return <div>Loading...</div>;

	return <PostForm action='delete' id={id} title={post.title} body={post.body} onTitleChange={() => {}} onBodyChange={() => {}} onSubmit={handleDelete} />;
};

export default DeletePost;

/* Neste exemplo, adicionamos o uso do contexto de post, importado através do usePosts do PostContext. A função usePosts retorna o estado posts e a função dispatch do contexto. O estado posts contém todos os posts, e a função dispatch é usada para enviar a ação de adição ou remoção de post para o reducer.

No useEffect, verificamos se o post já está presente no estado posts do contexto. Se não estiver presente, fazemos uma chamada para buscar o post no servidor e adicioná-lo ao estado posts através da ação ADD_POST.

Após a exclusão do post, chamamos a função dispatch com a ação DELETE_POST e o ID do post a ser removido como payload. Isso atualiza o estado posts no contexto. */

/**The code you provided is a React component named `DeletePost` that is responsible for deleting a post. It interacts with the React Router, an Axios API call, and a custom context (possibly using Redux or another state management solution). Let's break down the code step by step:

1. **Import Statements:**
   ```javascript
   import { useEffect, useState } from 'react';
   import { useParams, useNavigate } from 'react-router-dom';
   import { usePosts } from '../hooks/usePosts';
   import axios from 'axios';
   import PostForm from '../components/PostForm';
   ```

   - `useEffect`: Importing the `useEffect` hook from React to manage side effects.
   - `useState`: Importing the `useState` hook from React to manage component-level state.
   - `useParams`: Importing `useParams` from 'react-router-dom' to access route parameters.
   - `useNavigate`: Importing `useNavigate` from 'react-router-dom' to programmatically navigate to different routes.
   - `usePosts`: Importing a custom hook, possibly part of a custom context, to manage posts in the application.
   - `axios`: Importing the Axios library for making HTTP requests.
   - `PostForm`: Importing a custom component named `PostForm`.

2. **Component Declaration:**
   ```javascript
   const DeletePost = () => {
   ```

   This code defines a functional React component named `DeletePost`.

3. **Accessing Route Parameters:**
   ```javascript
   const { id: postId } = useParams();
   const id = Number(postId);
   ```

   It uses `useParams` to extract the `id` parameter from the route. It also converts it into a number (assuming it's meant to be a numeric identifier).

4. **Context and Dispatch:**
   ```javascript
   const navigate = useNavigate();
   const { dispatch } = usePosts();
   ```

   - `navigate` is set to the `useNavigate` hook to enable navigation in the application.
   - `dispatch` is destructured from the result of calling the `usePosts` hook, which is used to access and manipulate posts within the application's context.

5. **State Initialization:**
   ```javascript
   const [post, setPost] = useState(null);
   ```

   The component uses the `useState` hook to initialize a local state variable `post`, which will be used to store post data fetched from the server.

6. **Fetching Post Details with `useEffect`:**
   ```javascript
   useEffect(() => {
     const fetchPost = async () => {
       try {
         const response = await axios.get(`http://localhost:5000/posts/${id}`);
         setPost(response.data);
       } catch (error) {
         console.error('Erro ao buscar detalhes do post:', error);
       }
     };

     fetchPost();
   }, [id]);
   ```

   - This `useEffect` runs when the component mounts and whenever the `id` parameter changes.

   - It sends an Axios GET request to fetch post details from the server based on the provided `id`. The response data is stored in the `post` state variable.

   - If there's an error during the request, it's logged to the console.

7. **Delete Post Function:**
   ```javascript
   const handleDelete = async () => {
     try {
       await axios.delete(`http://localhost:5000/posts/${id}`);
       dispatch({ type: 'DELETE_POST', payload: id });
       alert('post apagado');
       navigate('/');
     } catch (error) {
       console.error('Erro ao deletar post:', error);
     }
   };
   ```

   - `handleDelete` is an asynchronous function called when the form (rendered by `PostForm`) is submitted. It deletes the post.

   - It sends an Axios DELETE request to remove the post based on the provided `id`.

   - After a successful delete, it dispatches an action 'DELETE_POST' with the `id` to update the state of posts, likely from the context.

   - It shows an alert message indicating that the post has been deleted.

   - Finally, it uses `navigate` to redirect to the main page (or the root route).

8. **Conditional Rendering:**
   ```javascript
   if (!post) return <div>Loading...</div>;
   ```

   If `post` is not yet loaded (null), it displays a loading message.

9. **Rendering the Component:**
   ```javascript
   return <PostForm action='delete' id={id} title={post.title} body={post.body} onTitleChange={() => {}} onBodyChange={() => {}} onSubmit={handleDelete} />;
   ```

   The component returns a `PostForm` with props set for a delete action. It passes the `id`, `title`, and `body` from the fetched post data. Since it's a delete operation, it sets empty functions for `onTitleChange` and `onBodyChange` (presumably, these functions are not needed for deleting). The `onSubmit` is set to `handleDelete`.

Overall, this component is used to delete a post in the application and relies on Axios for making API requests and a custom context (possibly involving Redux or another state management solution) to manage the state of posts. It also uses a custom `PostForm` component to render the form. */
