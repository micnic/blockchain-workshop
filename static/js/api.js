const address = '0xc8ff1afbbad2a06a1da96b22076eb3245caf9c62';

let contract = null;

export default class Api {

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

	static vote( proposalName ) {

		return new Promise((resolve, reject) =>  {

			if (contract) {

				contract.vote((error) => {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				})
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

	static getContract() {

		return fetch('/abi.json').then((response) => {

			return response.json();
		}).then((result) => {

			contract = web3.eth.contract(result).at(address);

			return contract;
		});
	}
}

