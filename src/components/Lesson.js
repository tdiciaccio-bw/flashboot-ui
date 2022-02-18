
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import Api from './Api';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router';
import { Dimmer, Loader } from 'semantic-ui-react';
import { DeckContext } from '../contexts/DeckContext';

const Lesson = () => {
	const defaultState = {
		cardList: [],
		currentCardIndex: 0,
		isLoading: true,
		errorMessage: null,
		scoredCardList: [],
		lessonComplete: false
	};
	
	const { deckContext } = useContext(DeckContext);
	
	const [state, setState] = useState(defaultState);
	const [api, setApi] = useState(null);
	
	const { oktaAuth, authState } = useOktaAuth();
	
	useEffect(() => {
		setState(state => {
			return { ...state, isLoading: true };
		});
		const getLesson = async (api) => {
			const { data } = await api.getLesson(deckContext.id);
			setState(state => {
				return { ...state, cardList: data, isLoading: false };
			});
		};
		if (authState && authState.isAuthenticated) {
			const token = oktaAuth.getAccessToken();
			const api = new Api(token);
			setApi(api);
			getLesson(api);
		}
	}, [authState, oktaAuth]);
	
	const advanceCard = (score) => {
		const { cardList, currentCardIndex, scoredCardList } = state;
		let scoredCard = {
			card: cardList[currentCardIndex],
			score: score
		};
    
		const indexLimit = cardList.length - 1;
		if (currentCardIndex > indexLimit) {
			setState(...state, {
				currentCardIndex: 0,
				scoredCardList: [...scoredCardList, scoredCard]
			});
		}
		if (currentCardIndex === indexLimit) {
			setState(state => {
				return {
					...state, 
					lessonComplete: true,
					scoredCardList: [...scoredCardList, scoredCard]
				};
			});
		}
		if (currentCardIndex < indexLimit) {
			setState(state => {
				return {
					...state, 
					currentCardIndex: currentCardIndex + 1,
					scoredCardList: [...scoredCardList, scoredCard]
				};
			});
		}
	};
	
	useEffect(() => {
		if (state.lessonComplete) {
			sendData();
		}
	}, [state]);
  
	const sendData = () => {
		console.log(JSON.stringify(state.scoredCardList));
		api.sendCompletedLesson(state.scoredCardList);
	};
	
	if (state.isLoading) {
		return (
			<Dimmer enabled>
				<Loader />
			</Dimmer>
		);
	}
	
	if (state.lessonComplete) {
		return <Redirect to='/complete' />;
	}

	return (
		<div className="d-flex flex-row flex-container flex-wrap justify-content-center">
			<Card card={state.cardList[state.currentCardIndex]} onCardComplete={ advanceCard } /> 
		</div>
	);
		
};

export default Lesson;
