import React, { useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Container, Form, Button, Icon, Message } from 'semantic-ui-react';
import Api from './Api';
import { DeckContext } from '../contexts/DeckContext';

const Add = () => {
	const emptySet = { front: '', back: '' };
	const [inputAmount, setInputAmount] = useState(1);
	const [newCardObject, setNewCardObject] = useState({ '1': emptySet });
	const [createInverse, setCreateInverse] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const { deckContext } = useContext(DeckContext);
	const { oktaAuth } = useOktaAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let payload = Object.keys(newCardObject).map((i) => {
			return { 'question': newCardObject[i].front, 'answer': newCardObject[i].back };
		});
		
		if (createInverse) {
			let inversePayload = Object.keys(newCardObject).map((i) => {
				return { 'question': newCardObject[i].back, 'answer': newCardObject[i].front };
			});
			payload = payload.concat(inversePayload);
		}
		const api = new Api(oktaAuth.getAccessToken());	
		const response = await api.addCard(payload, deckContext.id);
		if (response > 0) {
			setSuccessMessage(`Successfully added ${response} cards to ${deckContext.name}`);
		}
	};
	
	const handleChange = (e) => {
		const { id, name, value } = e.target;
		setNewCardObject(newCardObject => ({ ...newCardObject, [id]: { ...newCardObject[id], [name]: value } }));
	};
	
	const handleAdd = () => {
		let newInputAmount = inputAmount + 1;
		setInputAmount(newInputAmount);
		setNewCardObject({ ...newCardObject, [newInputAmount]: emptySet });
	};
	
	const handleToggle = () => {
		setCreateInverse(!createInverse);
	};
	
	const resetState = (e) => {
		e.preventDefault();
		setInputAmount(1);
		setNewCardObject({ '1': emptySet });
		setCreateInverse(false);
		setSuccessMessage('');
	};

	const renderInputSections = () => {
		let content = [];
		for (var i = 1; i <= inputAmount; i++) {
			content.push(
				<Form.Group key={i}>
					<Form.Input id={i.toString()} name='front' placeholder='Front' value={ newCardObject[i].front } onChange={ handleChange }/>
					<Form.Input id={i.toString()} name='back' placeholder='Back' value={ newCardObject[i].back } onChange={ handleChange }/>
					{ i === inputAmount ?
						<Button icon onClick={ handleAdd }>
							<Icon name='plus' />
						</Button> : null }
				</Form.Group>
			);
		}
		return content;
	};

	return (
		<Container>
			<h1>Add New Cards</h1>
			<Form onSubmit={ handleSubmit }>
				{ renderInputSections() }
				<Form.Group inline>
					<Form.Button onClick={ handleSubmit }>Submit</Form.Button>
					<Form.Button onClick={ resetState }>Clear</Form.Button>
					<Form.Radio toggle label='Create inverted cards too' checked={ createInverse } onClick={ handleToggle }/>
				</Form.Group>
			</Form>
			{ successMessage !== '' ? 
				<Message positive>
					<Message.Header>Success</Message.Header>
					<p>{ successMessage }</p>
				</Message>
				: null }
		</Container>
	);
};

export default Add;
