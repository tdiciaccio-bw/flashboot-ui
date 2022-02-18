import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Dimmer, List, Loader } from 'semantic-ui-react';
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
				{ decks.map(({ deck, studiedCardCount, averageScore }) => {
					return (
						<Card key={deck.id}>
							<Card.Content>
								<Card.Header>{deck.name}</Card.Header>
								<Card.Meta>{deck.description}</Card.Meta>
								<Card.Content>
									<List>
										<List.Item>{deck.numberOfCards} Total Cards</List.Item>
										<List.Item>{studiedCardCount} Cards Studied So Far</List.Item>
										<List.Item>Average Score: {averageScore}</List.Item>
									</List>
								</Card.Content>
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
