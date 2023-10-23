/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostForm = ({ action, id, title, body, onTitleChange, onBodyChange, onSubmit }) => {
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		// Ação DELETE
		if (action === 'delete') {
			onSubmit();
			return;
		}

		// Lógica para CREATE e UPDATE
		let url = 'http://localhost:5000/posts';

		// Se estiver atualizando, adicionamos o ID à URL
		if (action === 'update') {
			url += `/${id}`;
		}

		try {
			action === 'update' ? await axios.put(url, { title, body }) : await axios.post(url, { title, body });

			navigate('/'); // Navega de volta para o início após a operação
		} catch (error) {
			console.error(`Failed to ${action} post.`, error);
		}
	};

	return (
		<section className='contacts'>
			<div className='contacts__wrapper'>
				<form onSubmit={handleSubmit} className='contacts__form'>
					<h3> {action === 'update' ? 'Update Post' : action === 'delete' ? 'Delete Post' : 'Create Post'}</h3>
					<div className='contacts__input'>
						<label>Title</label>
						<input type='text' value={title} onChange={e => onTitleChange(e.target.value)} required />
					</div>
					<div className='contacts__input'>
						<label>Body</label>
						<textarea value={body} onChange={e => onBodyChange(e.target.value)} required />
					</div>
					<div className='contacts__input'>
						{action === 'delete' ? (
							<>
								<button className='form__btns' type='button' onClick={onSubmit}>
									Delete
								</button>
								<button className='form__btns' type='button' onClick={() => navigate('/')}>
									Cancel
								</button>
							</>
						) : (
							<>
								<button className='form__btns' type='submit'>
									{action === 'update' ? 'Update' : 'Submit'}
								</button>
								<button className='form__btns' type='button' onClick={() => navigate('/')}>
									Cancel
								</button>
							</>
						)}
					</div>
				</form>
			</div>
		</section>
	);
};

export default PostForm;

/**The `PostForm` component is a reusable form component in a React application that allows the user to create, update, or delete a post. It receives various props to customize its behavior, and it uses the React Router for navigation and Axios for making HTTP requests. Here's a breakdown of the code:

1. **Function Component Declaration:**
   ```javascript
   const PostForm = ({ action, id, title, body, onTitleChange, onBodyChange, onSubmit }) => {
   ```

   This code defines a functional React component named `PostForm`. It takes several props as arguments to configure its behavior:
   - `action`: Indicates the form action, which can be 'create', 'update', or 'delete'.
   - `id`: The identifier of the post.
   - `title`: The title of the post.
   - `body`: The body of the post.
   - `onTitleChange`: A callback function to handle changes in the title input.
   - `onBodyChange`: A callback function to handle changes in the body input.
   - `onSubmit`: A callback function to handle form submission.

2. **Navigation and Axios Setup:**
   ```javascript
   const navigate = useNavigate();
   ```

   It uses the `useNavigate` hook from React Router to enable programmatic navigation within the application. It is used to navigate back to the main page after a form submission.

3. **Form Submission Handling:**
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault();

     if (action === 'delete') {
       onSubmit();
       return;
     }

     let url = 'http://localhost:5000/posts';

     if (action === 'update') {
       url += `/${id}`;
     }

     try {
       if (action === 'update') {
         await axios.put(url, { title, body });
       } else {
         await axios.post(url, { title, body });
       }

       navigate('/'); // Navigate back to the main page after the operation.
     } catch (error) {
       console.error(`Failed to ${action} post.`, error);
     }
   };
   ```

   - The `handleSubmit` function is called when the form is submitted.
   - If the `action` is 'delete', it calls the `onSubmit` callback (for delete action) and returns.
   - It constructs the appropriate URL for the API based on the `action` and `id` props.
   - It makes an HTTP request using Axios (`axios.post` for create and `axios.put` for update).
   - After a successful operation, it navigates back to the main page.
   - If there is an error, it logs an error message to the console.

4. **Rendered Form:**
   ```javascript
   return (
     <section className='contacts'>
       <div className='contacts__wrapper'>
         <form onSubmit={handleSubmit} className='contacts__form'>
           <h3> {action === 'update' ? 'Update Post' : action === 'delete' ? 'Delete Post' : 'Create Post'}</h3>
           <div className='contacts__input'>
             <label>Title</label>
             <input type='text' value={title} onChange={(e) => onTitleChange(e.target.value)} required />
           </div>
           <div className='contacts__input'>
             <label>Body</label>
             <textarea value={body} onChange={(e) => onBodyChange(e.target.value)} required />
           </div>
           <div className='contacts__input'>
             {action === 'delete' ? (
               <>
                 <button className='form__btns' type='button' onClick={onSubmit}>
                   Delete
                 </button>
                 <button className='form__btns' type='button' onClick={() => navigate('/')}>
                   Cancel
                 </button>
               </>
             ) : (
               <>
                 <button className='form__btns' type='submit'>
                   {action === 'update' ? 'Update' : 'Submit'}
                 </button>
                 <button className='form__btns' type='button' onClick={() => navigate('/')}>
                   Cancel
                 </button>
               </>
             )}
           </div>
         </form>
       </div>
     </section>
   );
   ```

   This part renders the form with the following components:
   - A form with an `onSubmit` handler that calls the `handleSubmit` function.
   - The form title ('Update Post', 'Delete Post', or 'Create Post') is based on the `action` prop.
   - Input fields for the title and body of the post. The values are controlled by the `title` and `body` props, and changes are handled by the `onTitleChange` and `onBodyChange` callback functions.
   - Buttons for actions such as 'Delete', 'Update', 'Submit', and 'Cancel' based on the `action` prop. The `onClick` handlers trigger the respective actions.

Overall, this `PostForm` component is designed to be versatile and reusable, accommodating create, update, and delete actions for posts. It leverages the React Router for navigation and Axios for making API requests, and it's intended to be used in different parts of the application where post management is required. */
