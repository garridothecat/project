import * as yup from 'yup';

const signupSchema = yup.object().shape({
	firstName: yup.string().required('O primeiro nome é obrigatório'),
	lastName: yup.string().required('O sobrenome é obrigatório'),
	email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
	age: yup
		.number()
		.typeError('A idade deve ser um número válido')
		.min(18, 'Tens de ser maior de idade')
		.max(65, 'Estás reformado, larga o computador e aproveita a vida!!!')
		.positive()
		.integer()
		.required('A idade é obrigatória'),
	password: yup.string().min(4, 'A senha deve ter pelo menos 4 caracteres').max(15, 'A senha deve ter no máximo 15 caracteres').required('A senha é obrigatória'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem corresponder'),
});

export default signupSchema;
/**The provided code defines a Yup validation schema for a signup form. Yup is a JavaScript schema validation library, often used with form libraries like Formik to define validation rules for form fields. Let's break down the `signupSchema` step by step:

1. **Import Yup:**
   ```javascript
   import * as yup from 'yup';
   ```

   This line imports Yup and aliases it as `yup`.

2. **Schema Definition:**
   ```javascript
   const signupSchema = yup.object().shape({
     // Validation rules for form fields
   });
   ```

   The `signupSchema` is defined as a Yup object schema. Inside the schema, you define validation rules for various form fields.

3. **Validation Rules for Form Fields:**
   - `firstName`: The first name field is defined as a string that is required. If it's not provided, the error message 'O primeiro nome é obrigatório' is shown.

   - `lastName`: Similar to `firstName`, the last name field is required.

   - `email`: The email field is defined as a string that must be a valid email address. If it's not a valid email address, the error message 'Insira um e-mail válido' is shown. It's also required.

   - `age`: The age field is defined as a number, and the following rules are applied:
     - It must be a valid number (if not, 'A idade deve ser um número válido' is shown).
     - It must be at least 18 (or 'Tens de ser maior de idade' is shown).
     - It must not exceed 65 (or 'Estás reformado, larga o computador e aproveita a vida!!!' is shown).
     - It must be a positive integer.
     - It's required.

   - `password`: The password field is defined as a string with these rules:
     - It must be at least 4 characters long (or 'A senha deve ter pelo menos 4 caracteres' is shown).
     - It must not exceed 15 characters (or 'A senha deve ter no máximo 15 caracteres' is shown).
     - It's required.

   - `confirmPassword`: This field is defined as a string, and it must match the value of the 'password' field (or 'As senhas devem corresponder' is shown). It's also required.

4. **Exporting the Schema:**
   ```javascript
   export default signupSchema;
   ```

   The `signupSchema` object is exported so that it can be used in other parts of your application, as shown in the previous code example where it's imported and used in the Formik configuration to validate form input.

This `signupSchema` helps ensure that the data entered in your signup form adheres to specific rules and constraints, and it's a common practice for form validation in React applications. */
