import axios from 'axios';

class Api {

	constructor(authToken) {
		this.authToken = authToken;
		this.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
		this.BASE_URL = 'https://master.dibdt4fs56nsw.amplifyapp.com/api';
	}

	createHeaders() {
		return this.authToken ? {
			...this.headers,
			'Authorization': 'Bearer ' + this.authToken
		} : this.headers;
	}

	async getLesson(deckId) {
		return await axios.get(`${this.BASE_URL}/lesson?size=5&deck=${deckId}`, {
			headers: this.createHeaders()
		});
	}
  
	async sendCompletedLesson(scoredCardList) {
		await axios.post(`${this.BASE_URL}/lesson`, 
			scoredCardList,
			{
				headers: this.createHeaders()
			}
		);
	}
  
	async addCard(cardList, deckId) {
		const body = {
			cards: cardList,
			deck: deckId
		};
		let response = await axios.post(`${this.BASE_URL}/cards`,
			body,
			{
				headers: this.createHeaders()
			});
		if (response.status === 201) {
			return response.data.length;
		} else {
			return 0;
		}
	}
	
	async getDecks() {
		return await axios.get(`${this.BASE_URL}/decks`,
			{ headers: this.createHeaders()
			});
	}
	
	async addDeck(name, description) {
		let payload = {
			name: name,
			description: description
		};

		return await axios.post(`${this.BASE_URL}/decks`,
			payload,
			{ headers: this.createHeaders()
			});
	}

}

export default Api;
