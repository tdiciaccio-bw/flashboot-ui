import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Dimmer, Loader } from 'semantic-ui-react';
import { DeckContext } from '../contexts/DeckContext';
import Api from './Api';
import NewDeckTile from './NewDeckTile';

const Decks = () => {
	const [decks, setDecks] = useState([]);
	const [loading, setLoading] = useState(true);
	const { oktaAuth } = useOktaAuth();
	const { deckContext, setDeckContext } = useContext(DeckContext);

	useEffect(() => {
		const getDecks = async () => {
			const api = new Api(oktaAuth.getAccessToken());
			const { data } = await api.getDecks();
			setDecks(data);
			setLoading(false);
		};
		
		getDecks();
	}, []);
	
	const handleButtonClick = (id) => {
		setDeckContext(id);
		
	};

	if (loading) {
		return (
			<Dimmer active>
				<Loader />
			</Dimmer>
		);
	}
	

	return (
		<Container>
			<h1>Decks Page</h1>
			<h2>Current Deck: { deckContext ? deckContext.name : null}</h2>
			<Card.Group>
				{ decks.map((deck) => {
					return (
						<Card key={deck.id}>
							<Card.Content>
								<Card.Header>{deck.name}</Card.Header>
								<Card.Description>{deck.description}</Card.Description>
							</Card.Content>
							<Card.Content extra textAlign='center'>
								<Button onClick={() => handleButtonClick(deck)}>
									<Link className="app-link" to="/">Select</Link>
								</Button>
							</Card.Content>
						</Card>
					);
				})
				}
				<NewDeckTile />
			</Card.Group>
		</Container>
	);
};

export default Decks;
