import React, { useState } from 'react';
import Wrapper from '../sections/Wrapper';
import avatarImage from '../assets/img.jpg';
import { FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa';
import Form from '../components/Form';

function About() {
	const [message, setMessage] = useState('');

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle the form submission here, e.g., send a message to the server.
		console.log('Submitted message: ' + message);
	};

	return (
		<div className='profile'>
			<img src={avatarImage} alt='' className='profile-image' />
			<h1 className='profile-text'>Hi! I am João Garrido</h1>
			<h2 className='profile-text'>Full Stack Developer</h2>
			<h4 className='profile-text'>This project was created from a YouTube tutorial</h4>
			<div className='profile-links'>
				<a href='https://github.com/garridothecat'>
					<FaGithub />
				</a>
				<a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
					<FaYoutube />
				</a>
				<a href='https://www.linkedin.com/in/jo%C3%A3o-garrido-878455155/'>
					<FaLinkedin />
				</a>
			</div>

			{/* Form section */}
			<div className='contact-form'>
				<Form />
			</div>
		</div>
	);
}

export default Wrapper(About);

/**The provided code is a React component called "About." This component appears to be a part of a larger web application, possibly a personal portfolio or website. Let's break down the key elements of this code:

1. **React and Dependencies**: The code begins by importing React, as well as several components and assets. Notably, it imports an image (`avatarImage`) and three social media icons (`FaYoutube`, `FaGithub`, `FaLinkedin`) from the 'react-icons/fa' library. It also imports a `Form` component from '../components/Form'.

2. **State**: Inside the `About` component, a state variable `message` is defined using the `useState` hook. This state is used to track the content of a message in a form.

3. **Event Handlers**: The component defines two functions:
   - `handleMessageChange` is a function that handles changes in a text area input. It updates the `message` state with the new value from the text area.
   - `handleSubmit` is a function that handles the form submission. In this example, it simply logs the submitted message to the console. In a real application, this is where you would typically send the message to a server.

4. **Render Method**: The render method returns JSX code that defines the structure and content of the component's user interface. It includes:
   - An image (`<img>`) with the `src` attribute set to `avatarImage`, which is an image imported at the beginning of the file.
   - Several `<h1>`, `<h2>`, and `<h4>` elements containing text. These elements display the user's name, job title, and a project acknowledgment.
   - A section for social media links represented as icons. Each icon is wrapped in an `<a>` element with an `href` attribute linking to the respective social media profile or page.
   - A `<div>` with the class name "contact-form" that renders the `Form` component. This suggests there is a form section in the "About" page, likely for sending a message or contacting the user.

5. **Export**: The component is exported as the default export of the module. It is also wrapped with the `Wrapper` component, which could be a higher-order component (HOC) that provides additional functionality or styling to the "About" component.

In summary, the "About" component is used to display information about the user (João Garrido) along with links to their social media profiles. It also includes a form section that uses the `Form` component for potential user interactions, such as sending messages or feedback. The component seems to be part of a personal portfolio or website showcasing the developer's profile and work. */
