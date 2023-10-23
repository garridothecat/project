import { useState } from 'react';
import { useFormik } from 'formik';
import signupSchema from './ValidationSchema';

/* Para a validação, o Formik já suporta integração com o Yup diretamente, 
portanto, não é necessário usar um resolver como no react-hook-form.
O método getFieldProps do Formik combina várias funções em uma, como lidar com o valor, onchange e onblur nos inputs. */

const Form = () => {
	const [formData, setFormData] = useState(null);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			age: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: signupSchema,
		onSubmit: values => {
			console.log(values);
			setFormData(values);
			formik.resetForm();
		},
	});

	return (
		<div className='Form'>
			<div className='title'>Formik Form</div>

			<form onSubmit={formik.handleSubmit}>
				<input type='text' name='firstName' placeholder='First Name...' {...formik.getFieldProps('firstName')} />
				<p>{formik.errors.firstName}</p>

				<input type='text' name='lastName' placeholder='Last Name...' {...formik.getFieldProps('lastName')} />
				<p>{formik.errors.lastName}</p>

				<input type='text' name='email' placeholder='Email...' {...formik.getFieldProps('email')} />
				<p>{formik.errors.email}</p>

				<input type='text' name='age' placeholder='Age...' {...formik.getFieldProps('age')} />
				<p>{formik.errors.age}</p>

				<input type='password' name='password' placeholder='Password...' {...formik.getFieldProps('password')} />
				<p>{formik.errors.password}</p>

				<input type='password' name='confirmPassword' placeholder='Confirm Password...' {...formik.getFieldProps('confirmPassword')} />
				<p>{formik.errors.confirmPassword}</p>

				<input type='submit' id='submit' />
			</form>

			{formData && (
				<div className='submittedData'>
					<h2>Dados Enviados:</h2>
					<pre>{JSON.stringify(formData, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default Form;

/**The code you provided is a React component that uses Formik for form management and validation. Formik is a popular library for handling forms in React applications. Let's break down this code step by step:

1. **Import Statements:**
   ```javascript
   import { useState } from 'react';
   import { useFormik } from 'formik';
   import signupSchema from './ValidationSchema';
   ```

   Here, the code imports necessary dependencies:
   - `useState` from 'react': This hook is used to manage state within the component.
   - `useFormik` from 'formik': This is a Formik hook that is used to set up form management and validation.
   - `signupSchema` from './ValidationSchema': This is an external schema that defines validation rules for the form fields.

2. **Functional Component Declaration:**
   ```javascript
   const Form = () => {
   ```

   This code defines a functional React component named `Form`.

3. **State Initialization:**
   ```javascript
   const [formData, setFormData] = useState(null);
   ```

   This line initializes a state variable `formData` using the `useState` hook. It's initially set to `null` and will be used to store form data when the form is submitted.

4. **Formik Configuration:**
   ```javascript
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
       age: '',
       password: '',
       confirmPassword: '',
     },
     validationSchema: signupSchema,
     onSubmit: values => {
       console.log(values);
       setFormData(values);
       formik.resetForm();
     },
   });
   ```

   Here, the `useFormik` hook is used to configure the Formik form handling. It takes an object with several properties:
   - `initialValues`: An object that defines the initial values for form fields.
   - `validationSchema`: This is a Yup validation schema provided in the `signupSchema` variable. Yup is a schema validation library often used with Formik.
   - `onSubmit`: A function that gets called when the form is submitted. In this case, it logs the form values, sets the `formData` state, and then resets the form.

5. **Render the Form:**
   ```javascript
   return (
     <div className='Form'>
       {/* ... */}
  /*   </div>
   );
   ```

   The `return` statement renders the form component within a `<div>` with the class name 'Form'.

6. **Form Inputs and Error Messages:**
   Inside the form, there are input fields for first name, last name, email, age, password, and confirmPassword. These inputs use Formik's `getFieldProps` method to manage their values, onChange, and onBlur events, and they display any validation errors associated with each field.

7. **Form Submission:**
   ```javascript
   <form onSubmit={formik.handleSubmit}>
   ```
   The form uses the `formik.handleSubmit` function as the `onSubmit` handler, which is called when the form is submitted. This function is defined by Formik and will trigger the `onSubmit` function provided in the Formik configuration.

8. **Displaying Submitted Data:**
   After the form is successfully submitted, the `formData` state is not null (i.e., there are submitted data), and the submitted data is displayed below the form.

That's an overview of what this code does. It sets up a form using Formik, handles validation, and displays submitted data. Formik simplifies form management and validation in React applications, making it easier to work with complex forms. 
*/