import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteDoc, doc } from 'firebase/firestore';
import { pokemonListRef } from '../../utils/firebaseConfig';

export const removePokemonFromUserList = createAsyncThunk('pokemon/remove', async ({ id }: { id: string }) => {
	try {
		await deleteDoc(doc(pokemonListRef, id));
		return { id };
	} catch (err) {
		console.log(err);
	}
});
/*This TypeScript code defines an asynchronous Redux Thunk action creator, `removePokemonFromUserList`, which is responsible for removing a Pokémon from a user's collection in a Firebase Firestore database. It uses Firebase Firestore functions for this purpose.

Let's break down the code:

1. Import Statements:
   - The code imports `createAsyncThunk` from the Redux Toolkit, as well as functions for deleting documents (`deleteDoc`) and creating document references (`doc`) from Firebase Firestore. It also imports a `pokemonListRef` from a utility file, likely representing a reference to a specific collection in the Firestore database.

2. `removePokemonFromUserList` Definition:
   - `removePokemonFromUserList` is created using `createAsyncThunk`, specifying a unique name for this action: `"pokemon/remove"`.

3. Async Function Parameters:
   - The async function takes a single parameter, an object with the property `id` of type `string`. This `id` represents the unique identifier of the Pokémon document that needs to be removed.

4. Async Function Logic:
   - Inside the async function, a `try` block is used to handle potential errors.
   
   - It calls `deleteDoc` to delete the document from the Firestore collection. The `deleteDoc` function is provided with a document reference constructed using the `doc` function, which combines the reference to the `pokemonListRef` collection with the specific `id` of the document to be deleted.
   
   - After successfully deleting the document, an object containing the `id` of the deleted Pokémon is returned. This information can be useful for additional actions or UI updates in your application.

   - If an error occurs during the deletion process, the error is caught, and the error message is logged to the console.

So, `removePokemonFromUserList` is an action creator that deletes a specific Pokémon document from a Firebase Firestore collection and returns the `id` of the deleted Pokémon. This action is used to remove a Pokémon from a user's collection in a Firestore database, and it can be dispatched within your Redux application to initiate the removal process.*/
