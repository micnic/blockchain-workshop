const address = '0xb100ef781f0f84bc9835835735a297e878d81294';

let contract = null;

const fruitImages = {
	"Peach": "https://images.pexels.com/photos/42218/food-fresh-fruit-isolated-42218.jpeg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Ananas": "https://images.pexels.com/photos/27269/pexels-photo-27269.jpg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Grape": "https://images.pexels.com/photos/357742/pexels-photo-357742.jpeg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Strawberry": "https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Lemon": "https://images.pexels.com/photos/266346/pexels-photo-266346.jpeg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Kiwi": "https://images.pexels.com/photos/953215/pexels-photo-953215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=256&w=256",
	"Apple": "https://images.pexels.com/photos/162806/apple-fruit-fruits-delicious-162806.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=256&w=256",
	"Watermelon": "https://images.pexels.com/photos/880447/pexels-photo-880447.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=256&w=256",
	"Raspberry": "https://images.pexels.com/photos/59999/raspberries-fruits-fruit-berries-59999.jpeg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Banana": "https://images.pexels.com/photos/41957/banana-fruit-healthy-yellow-41957.jpeg?auto=compress&cs=tinysrgb&h=256&w=256",
	"Cherry": "https://images.pexels.com/photos/768009/pexels-photo-768009.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=256&w=256"
}

export default class Api {

	static imgURL(proposalName) {
		return fruitImages[proposalName];
	}

	static getProposals() {

		return new Promise((resolve, reject) => {

			if (contract) {
				contract.getProposals((error, proposals) => {
					if (error) {
						reject(error);
					} else {
						resolve(proposals.map((proposal) => {

							return web3.toUtf8(proposal);
						}))
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static vote(proposal) {

		return new Promise((resolve, reject) =>  {

			if (contract) {
				contract.vote(proposal, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static hasVoted() {
		return new Promise((resolve, reject) => {

			if (contract) {
				const userID = web3.eth.accounts[0];

				contract.hasVoted(userID, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static getProposalVoteCount( proposalName ) {

		return new Promise((resolve, reject) =>  {

			if (contract) {

				contract.getProposalVoteCount(proposalName, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(web3.toDecimal(result));
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static getVote() {

		return new Promise((resolve, reject) => {

			if (contract) {
				const userID = web3.eth.accounts[0];

				contract.getVote(userID, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(web3.toUtf8(result));
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static getLeader() {

		return new Promise((resolve, reject) => {

			if (contract) {
				contract.getLeader((error, leader) => {
					if (error) {
						reject(error);
					} else {
						resolve(web3.toUtf8(leader))
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static getTotalVoteCount() {

		return new Promise((resolve, reject) => {

			if (contract) {
				contract.totalVoteCount.call((error, count) => {
					if (error) {
						reject(error);
					} else {
						resolve(web3.toDecimal(count))
					}
				});
			} else {
				reject(Error('No contract'));
			}
		});
	}

	static getContract() {

		return fetch('/abi.json').then((response) => {

			return response.json();
		}).then((result) => {

			contract = web3.eth.contract(result).at(address);

			window.contract = contract;

			return contract;
		});
	}
}

