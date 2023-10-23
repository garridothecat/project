import { useAppDispatch } from '../app/hooks';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, firebaseDB, usersRef } from '../utils/firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { setUserStatus } from '../app/slices/AppSlice';
function Login() {
	const dispatch = useAppDispatch();

	const handleLogin = async () => {
		const provider = new GoogleAuthProvider();
		const {
			user: { email, uid },
		} = await signInWithPopup(firebaseAuth, provider);

		if (email) {
			const firestoreQuery = query(usersRef, where('uid', '==', uid));
			const fetchedUser = await getDocs(firestoreQuery);
			if (fetchedUser.docs.length === 0) {
				await addDoc(collection(firebaseDB, 'users'), {
					uid,
					email,
				});
			}
			dispatch(setUserStatus({ email }));
		}
	};

	return (
		<div className='login'>
			<button onClick={handleLogin} className='login-btn'>
				<FcGoogle /> Login with Google
			</button>
		</div>
	);
}

export default Login;

/**The provided code is a React functional component called `Login`, which appears to implement a login functionality using Google Sign-In. Let's break down the code:

1. **Imports**:
   - The code includes several import statements for various dependencies and utilities, such as Firebase, React Icons, and functions related to Firebase authentication and Firestore.

2. **Function Declaration**:
   - The `Login` function is declared as a functional component.

3. **Function Body**:
   - Inside the `Login` function, the component is defined.

4. **Firebase Authentication**:
   - The `handleLogin` function is defined as an asynchronous function. This function is executed when the "Login with Google" button is clicked.

   - It uses Firebase Authentication to initiate the Google Sign-In process. A new `GoogleAuthProvider` is created, and the `signInWithPopup` function is called to sign in with Google.

   - If the sign-in is successful and the user's email and UID are available, it proceeds with the following steps:
     - It creates a Firestore query to check if a user with the same UID exists in the Firestore database.
     - It fetches the user based on the UID using the query.
     - If no user is found (the `fetchedUser.docs.length` is 0), it adds a new document to the "users" collection in Firestore with the UID and email.
     - It then dispatches the `setUserStatus` action from the Redux store with the user's email.

5. **JSX Element**:
   - The component returns a `<div>` element with a class name of "login."
   - Inside this `<div>, it renders a button with the text "Login with Google" and an icon from the `FcGoogle` React Icons component. The `onClick` event is set to trigger the `handleLogin` function when the button is clicked.

6. **Export**:
   - The `Login` component is exported as the default export of this module, making it available for use in other parts of the application.

This `Login` component allows users to log in with their Google accounts and, if necessary, creates a user profile in a Firestore database. It dispatches an action to update the user's status in the application's state. This is a common setup for user authentication in web applications that use Firebase for authentication and data storage. */
