import React from 'react';

const DeckContext = React.createContext({
	id: null,
	changeDeck: () => {}
});

export { DeckContext };
