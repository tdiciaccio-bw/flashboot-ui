import React, { useState } from 'react';
import Home from './components/Home';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Route, useHistory } from 'react-router-dom';
import NavBar from './components/NavBar';
import Lesson from './components/Lesson';
import Complete from './components/Complete';
import Decks from './components/Decks';
import Add from './components/Add';
import { DeckContext } from './contexts/DeckContext';
import { UserContext } from './contexts/UserContext';

const oktaAuth = new OktaAuth({
	issuer: 'https://dev-74184285.okta.com/oauth2/default',
	clientId: '0oa2djdqnuk3u6VVb5d7',
	redirectUri: window.location.origin + '/login/callback'
});

const App = () => {
  
	const history = useHistory();
	const restoreOriginalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri, window.location.origin));
	};
	
	const [deckContext, setDeckContext] = useState(null);
	const [userContext, setUserContext] = useState(null);
  
	const deckValue = { deckContext, setDeckContext };
	const userValue = { userContext, setUserContext };

	return (
		<Security
			oktaAuth={oktaAuth}
			restoreOriginalUri={restoreOriginalUri}
		>
			<DeckContext.Provider value={ deckValue }>
				<UserContext.Provider value={ userValue }>
					<NavBar/>
					<Route path='/' exact={true} component={Home}/>
					<SecureRoute path='/study' component={Lesson}/>
					<SecureRoute path='/complete' exact={true} component={Complete}/>
					<SecureRoute path='/add' exact={true} component={Add}/>
					<SecureRoute path='/decks' component={Decks}/>
					<Route path='/login/callback' component={LoginCallback}/>
				</UserContext.Provider>
			</DeckContext.Provider>
		</Security>
	);
};

export default App;
