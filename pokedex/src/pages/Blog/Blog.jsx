import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:5000/posts');

				if (!response.ok) {
					throw new Error('Network response foi nos piriquitos :(');
				}

				const data = await response.json();
				const sortedData = data.sort((a, b) => b.id - a.id); // Ordena os posts por ID de maneira decrescente
				setPosts(sortedData);
			} catch (error) {
				setError(error);
			}
		};

		fetchPosts();
	}, []);

	return (
		<section id='blog' className='blog'>
			<div className='container'>
				<div className='blog__wrapper'>
					<div className='blog__header'>
						<h2>
							just keep <Link to={`/create`}>posting...</Link>
						</h2>
					</div>

					<div className='blog__posts'>
						{error && <h4>{error.message}</h4>}

						{posts.map(post => (
							<article className='blog__post' key={post.id}>
								<h3>
									{post.id} - {post.title}
								</h3>
								<p>{post.body}</p>
								<Link to={`/update/${post.id}`} className='blog__btn update'>
									Update
								</Link>
								<Link to={`/delete/${post.id}`} className='blog__btn delete'>
									Delete
								</Link>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;

/**The `Home` component is a React functional component that appears to represent a blog-style homepage. It fetches a list of posts from an API and displays them on the page. Here's a breakdown of the code:

1. **State Variables:**
   ```javascript
   const [posts, setPosts] = useState([]);
   const [error, setError] = useState(null);
   ```

   - The component manages two state variables: `posts` and `error`.
   - `posts` is used to store the retrieved list of posts.
   - `error` is used to handle and display any errors that might occur during the data fetching process.

2. **Fetching Posts with `useEffect`:**
   ```javascript
   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const response = await fetch('http://localhost:5000/posts');

         if (!response.ok) {
           throw new Error('Network response foi nos piriquitos :(');
         }

         const data = await response.json();
         const sortedData = data.sort((a, b) => b.id - a.id);
         setPosts(sortedData);
       } catch (error) {
         setError(error);
       }
     };

     fetchPosts();
   }, []);
   ```

   - The `useEffect` hook is used to fetch data from the server when the component mounts.
   - It sends a GET request to `'http://localhost:5000/posts'` to retrieve a list of posts.
   - It checks if the response status is OK. If not, it throws an error.
   - If the response is successful, it parses the JSON data and sorts the posts by their `id` in descending order.
   - The sorted posts are then stored in the `posts` state.
   - If an error occurs during the process, it is caught and stored in the `error` state.

3. **Rendered Component:**
   ```javascript
   return (
     <section id='blog' className='blog'>
       {/* JSX content */
/*   </section>
   );
   ```

   - The component returns JSX that represents the content of the blog homepage.

4. **Displaying Posts and Error Handling:**
   ```javascript
   {error && <h4>{error.message}</h4>}

   {posts.map(post => (
     <article className='blog__post' key={post.id}>
       {/* Post content */
/*     </article>
   ))}
   ```

   - If there is an error (i.e., `error` is not null), an error message is displayed.
   - For each post in the `posts` array, an article element is rendered.
   - The `key` prop is set to `post.id` to uniquely identify each post.
   - The post's title and body are displayed within the article.
   - Two links, "Update" and "Delete," are provided for each post. These links are used to navigate to the update and delete pages for the respective post.

5. **Navigation Links:**
   ```javascript
   <h2>
     just keep <Link to={`/create`}>posting...</Link>
   </h2>
   ```

   - A header with the text "just keep posting..." is displayed.
   - A `Link` component from 'react-router-dom' is used to create a link that navigates to the "/create" route. This is likely used for creating a new post.

6. **Navigation Links for Update and Delete:**
   ```javascript
   <Link to={`/update/${post.id}`} className='blog__btn update'>
     Update
   </Link>
   <Link to={`/delete/${post.id}`} className='blog__btn delete'>
     Delete
   </Link>
   ```

   - For each post, there are two links: "Update" and "Delete."
   - These links are created using the `Link` component, and they contain the `to` prop to specify the routes for updating and deleting the respective post.

Overall, this component fetches and displays a list of posts, handles errors, and provides navigation links for creating, updating, and deleting posts. It appears to be a part of a blog application that manages blog posts. */
