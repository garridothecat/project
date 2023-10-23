import React from 'react';

const Wrapper = (Component: React.FC) => () => {
	return (
		<div className='content'>
			<Component />
		</div>
	);
};

export default Wrapper;

/**The provided code defines a higher-order component (HOC) called "Wrapper." HOCs are a common pattern in React used to wrap other components to provide additional functionality, styling, or layout. In this case, the "Wrapper" HOC is designed to wrap another functional component (represented as `Component`) and add a surrounding `<div>` with a specific CSS class.

Here's a breakdown of the code:

1. The "Wrapper" function takes a single argument, `Component`, which is expected to be a functional component. The type of `Component` is specified as `React.FC`, indicating that it's a functional component.

2. Inside the "Wrapper" function, a new functional component is defined, which takes no props. This inner component is an anonymous functional component.

3. Within the inner component, a `<div>` element with the CSS class "content" is rendered.

4. Inside the `<div>`, the `Component` is rendered. This is done by invoking `Component()`.

5. The inner component returned by the "Wrapper" function wraps the `Component` with the surrounding `<div>`, effectively adding a common container element around the original component.

The purpose of this "Wrapper" HOC is to provide a consistent layout or styling for the components it wraps. It's often used to avoid duplicating layout code across multiple components and to keep the application's structure clean and organized. Components wrapped with this "Wrapper" will automatically be enclosed within the specified container. */
