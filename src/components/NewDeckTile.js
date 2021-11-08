import { useOktaAuth } from '@okta/okta-react';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Input } from 'semantic-ui-react';
import { DeckContext } from '../contexts/DeckContext';
import Api from './Api';

const NewDeckTile = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [successful, setSuccessful] = useState(false);
	const { oktaAuth } = useOktaAuth();
	const { setDeckContext } = useContext(DeckContext);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const api = new Api(oktaAuth.getAccessToken());
		const response = await api.addDeck(name, description);	
		if (response.status === 201) {
			setDeckContext(response.data);
			setSuccessful(true);
		}
	};
	
	if (successful) {
		return <Redirect to="/add" />;
	}

	return (
		<Card>
			<Card.Content>
				<Input placeholder="Name" value={name} onChange={ (e) => setName(e.target.value) }/>
				<Input placeholder="Description" value={ description } onChange={ (e) => setDescription(e.target.value) }/>
			</Card.Content>
			<Card.Content extra textAlign="center">
				<Button onClick={ handleSubmit }>Create</Button>
			</Card.Content>
		</Card>
	);
};

export default NewDeckTile;
