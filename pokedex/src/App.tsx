import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

import Background from './components/Background';
import './scss/index.scss';
import { Suspense, lazy, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './utils/firebaseConfig';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearToasts, setUserStatus } from './app/slices/AppSlice';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';

//  crud imports
import CreatePost from './pages/Blog/api/CreatePost';
import UpdatePost from './pages/Blog/api/UpdatePost';
import DeletePost from './pages/Blog/api/DeletePost';

const Search = lazy(() => import('./pages/Search'));
const MyList = lazy(() => import('./pages/MyList'));
const About = lazy(() => import('./pages/About'));
const Compare = lazy(() => import('./pages/Compare'));
const Pokemon = lazy(() => import('./pages/Pokemon'));
const Blog = lazy(() => import('./pages/Blog/Blog'));

export default function App() {
	const { toasts } = useAppSelector(({ app }) => app);
	const dispatch = useAppDispatch();
	useEffect(() => {
		onAuthStateChanged(firebaseAuth, currentUser => {
			if (currentUser) {
				dispatch(setUserStatus({ email: currentUser.email as string }));
			}
		});
	}, [dispatch]);
	useEffect(() => {
		if (toasts.length) {
			const toastOptions: ToastOptions = {
				position: 'bottom-right',
				autoClose: 2000,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
			};
			toasts.forEach((message: string) => {
				toast(message, toastOptions);
			});
			dispatch(clearToasts());
		}
	}, [toasts, dispatch]);

	return (
		<div className='main-container'>
			<Background />
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<div className='app'>
						<Navbar />
						<Routes>
							<Route element={<Search />} path='/search' />
							<Route element={<MyList />} path='/list' />
							<Route element={<About />} path='/about' />
							<Route element={<Compare />} path='/compare' />

							<Route element={<Pokemon />} path='/pokemon/:id' />
							<Route element={<Navigate to='/pokemon/1' />} path='*' />
							<Route element={<Blog />} path='/Blog' />
							<Route element={<CreatePost />} path='/Create' />
							<Route element={<UpdatePost />} path='/Udate' />
							<Route element={<DeletePost />} path='/Delete' />
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
						<Footer />
						<ToastContainer />
					</div>
				</Suspense>
			</BrowserRouter>
		</div>
	);
}

/**The code you provided is a React application that uses the React Router library for routing, Firebase for authentication, and react-toastify for displaying toasts. Let's break down the main components and functionality of this code:

1. Import Statements: The code begins by importing various modules and components, including React Router components (`BrowserRouter`, `Navigate`, `Route`, and `Routes`), as well as other components, styles, and utility functions.

2. Firebase Authentication: The `onAuthStateChanged` function from Firebase is used to listen for changes in the authentication state. When a user is authenticated, it dispatches an action to update the user's status with their email.

3. Toast Notifications: Toast notifications are displayed for various messages using the `react-toastify` library. The `toasts` array from the Redux store is monitored, and when it contains messages, it displays toast notifications with specified options.

4. Routing: The application uses the `BrowserRouter` component from React Router to set up client-side routing. The `Routes` component contains a set of `Route` components, each with an associated `element`. These routes define what components are rendered for different URL paths. Notable routes include:

   - `/search`, `/list`, `/about`, `/compare`: These paths are associated with lazy-loaded components, such as `Search`, `MyList`, `About`, and `Compare`.

   - `/pokemon/:id`: This path includes a dynamic parameter `id` and is associated with the `Pokemon` component.

   - `/Blog`, `/Create`, `/Update`, `/Delete`: These paths are associated with CRUD operations, specifically the `Blog`, `CreatePost`, `UpdatePost`, and `DeletePost` components.

   - A catch-all route (`*`) is defined at the end, which redirects to the root path `/`.

5. Layout: The app is divided into sections, including a background, a navigation bar (`Navbar`), and a footer. The content is rendered within the `app` class.

6. Suspense and Lazy Loading: Components like `Search`, `MyList`, `About`, etc., are imported using dynamic import and lazy loading for better performance. The `Suspense` component is used to provide a loading indicator (the `Loader` component) while these components are being loaded.

7. Toast Container: The `ToastContainer` component is rendered to display toast notifications.

8. CSS: The code includes stylesheets to apply styles to the components and the app as a whole.

Overall, this code sets up a client-side routing system for a React application, handles user authentication with Firebase, displays toast notifications for various messages, and uses lazy loading to improve the app's performance by loading components on-demand. */
