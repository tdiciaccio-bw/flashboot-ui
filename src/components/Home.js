import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Dimmer, Loader } from 'semantic-ui-react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../contexts/UserContext';
import { DeckContext } from '../contexts/DeckContext';

const Home = () => {
	const { authState, oktaAuth } = useOktaAuth();
	const { userContext, setUserContext } = useContext(UserContext);
	const { deckContext } = useContext(DeckContext);

	const login = async () => {
		oktaAuth.signInWithRedirect({ originalUri: '/' });
	};
	
	const updateUserContext = (newValue) => {
		setUserContext(newValue);
	};
  
	useEffect(() => {
		if (!authState || !authState.isAuthenticated) {
			updateUserContext(null);
		} else {
			oktaAuth.getUser().then((info) => {
				updateUserContext(info);
			});
		}
	}, [authState, oktaAuth]);
  

	let content = ( 
		<Dimmer active>
			<Loader />
		</Dimmer>);
  
	if (!authState) {
		return content;
	}

	if (!authState.isAuthenticated) {
		login();
	}

	if (authState.isAuthenticated && userContext) {
		console.log(oktaAuth.getAccessToken());
		content = (
			<div className="app">
				<Container textAlign='center'>
					<div>
						<h1>Hi { userContext.given_name }</h1>
						{ deckContext ?
							<Button>
								<Link className="app-link" to="/study">Start Lesson</Link>
							</Button> :
							<Button>
								<Link className="app-link" to="/decks">Select Deck</Link>
							</Button>
						}	
					</div>
				</Container>
			</div>
		); 
	}
  
	return (
		content
	);
};

export default Home;
