import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';

const Card = (props) => { 
	const [showAnswer, setShowAnswer] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		props.onCardComplete(parseInt(e.currentTarget.id));
		setShowAnswer(false);
	};
	
	const answer = (
		<div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
			<Button type='button' id='0' color='violet' onClick={ handleClick }>No Clue</Button>
			<Button type='button' id='1' color='red' onClick={ handleClick }>Fail</Button>
			<Button type='button' id='2' color='orange' onClick={ handleClick }>Hard</Button>
			<Button type='button' id='3' color='yellow' onClick={ handleClick }>Okay</Button>
			<Button type='button' id='4' color='green' onClick={ handleClick }>Good</Button>
			<Button type='button' id='5' color='blue' onClick={ handleClick }>Easy</Button>
		</div>		
	);
	
	const question = (
		<div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
			<Button primary onClick={ () => setShowAnswer(true) }>Show Answer</Button>
		</div>	
	);

	return (
		<Container textAlign='center'>
			<br/><br/><br/>
			<h1>{ showAnswer ? props.card.answer : props.card.question }</h1>
			<br/><br/><br/><br/><br/>
			{ showAnswer ? answer : question }
		</Container>
	);
};

Card.propTypes = {
	onCardComplete: PropTypes.func,
	card: PropTypes.shape({
		answer: PropTypes.string,
		question: PropTypes.string
	})
};

export default Card;
