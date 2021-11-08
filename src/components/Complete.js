import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const Complete = () => {
	return (
		<Container textAlign='center'>
			<h1>Congratulations! Lesson complete</h1>
			<Button>
				<Link className='app-link' to='/study'>Study Again</Link>
			</Button>
			<Button>
				<Link className='app-link' to='/'>Home</Link>
			</Button>
		</Container>
	);
};

export default Complete;
