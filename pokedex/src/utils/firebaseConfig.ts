import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDNkwUXJFMOOYjNpnTkrCo1Y9nCeTpFC04',
	authDomain: 'pokedex-fe543.firebaseapp.com',
	projectId: 'pokedex-fe543',
	storageBucket: 'pokedex-fe543.appspot.com',
	messagingSenderId: '948503681986',
	appId: '1:948503681986:web:79250d83d60f75960a545b',
	measurementId: 'G-4Z4DWLHXGS',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, 'users');
export const pokemonListRef = collection(firebaseDB, 'pokemonList');

/**It looks like you have set up a Firebase configuration and exported several Firebase-related objects, which are commonly used in a Firebase project for tasks like authentication and database interactions. Let me provide a brief explanation of what each part of your code does:

1. Import Statements:
   - You are importing various functions from Firebase modules.
     - `initializeApp` from `"firebase/app"`: Initializes the Firebase app with the provided configuration.
     - `getAuth` from `"firebase/auth"`: Retrieves the authentication service.
     - `getFirestore`, `collection` from `"firebase/firestore"`: Retrieves the Firestore database service and sets up Firestore collections, respectively.

2. Firebase Configuration:
   - `firebaseConfig` is an object that contains the configuration settings for your Firebase project, including API keys, project ID, and other credentials. This information is essential for initializing Firebase and connecting to your Firebase services.

3. Initialize Firebase:
   - `const app = initializeApp(firebaseConfig);` initializes the Firebase app with your provided configuration. This step is required to use Firebase services.

4. Exported Objects:
   - `firebaseAuth`: This exports the authentication service, which you can use for user authentication, sign-in, and sign-out operations.

   - `firebaseDB`: This exports the Firestore database service, which you can use to interact with your Firebase Firestore database.

   - `usersRef`: This exports a reference to the "users" collection in your Firestore database. You can use this reference to perform CRUD (Create, Read, Update, Delete) operations on the "users" collection.

   - `pokemonListRef`: Similarly, this exports a reference to the "pokemonList" collection in your Firestore database.

With this setup, you can use `firebaseAuth` for user authentication and `usersRef` and `pokemonListRef` to interact with your Firestore database collections. This code is ready for further development of your Firebase-based application, where you can implement features like user management and storing Pokémon data. */
