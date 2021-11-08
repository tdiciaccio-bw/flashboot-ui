import React, { Fragment, useContext } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { DeckContext } from '../contexts/DeckContext';

const NavBar = () => {
	
	const { deckContext } = useContext(DeckContext);
	const { authState, oktaAuth } = useOktaAuth();
	
	const logout = async () => oktaAuth.signOut();

	if (!authState) {
		return <div></div>;
	}
	
	return (
		<Menu inverted>
			<Menu.Item
				as={NavLink} exact to="/" name="home"
			>
				<Icon name='home'/>
			</Menu.Item>
			<Menu.Item
				as={NavLink} exact to="/decks" name="select deck"
			/>
			{ deckContext ? 
				<Fragment>
					<Menu.Item
						as={NavLink} exact to="/add" name="add cards"
					/>
					<Menu.Item
						as={NavLink} exact to="/study" name="study"
					/>
				</Fragment>
				: null 
			}
			<Menu.Item
				onClick={ logout } name="logout" position="right"
			/>			

		</Menu>
	);

};

export default NavBar;
