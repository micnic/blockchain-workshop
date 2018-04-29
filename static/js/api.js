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

	static getContract() {

		return fetch('/abi.json').then((response) => {

			return response.json();
		}).then((result) => {

			contract = web3.eth.contract(result).at(address);

			return contract;
		});
	}
}

