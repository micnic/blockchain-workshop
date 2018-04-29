import React from 'react';

import Api from '../api';

import Proposal from './Proposal';

export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			loaded: false,
			voted: false,
			proposals: null
		};
	}

	componentDidMount() {

		Api.getContract().then((contract) => {

			return Promise.all([
				Promise.resolve(contract),
				Api.hasVoted(),
				Api.getProposals()
			]);
		}).then(([contract, voted, proposals]) => {

			if (!voted) {
				contract.Voted().watch((error, response) => {
					this.setState({
						voted: true
					});
				});
			}

			this.setState({
				loaded: true,
				proposals,
				voted
			});
		}).catch((error) => {
			console.log('Could not load abi');
		});
	}

	render() {

		if (this.state.loaded) {

			const title = React.createElement('div', {}, 'Here are our proposals:');

			const proposals = this.state.proposals.map((proposal) => {

				return React.createElement(Proposal, {
					proposal,
					voted: this.state.voted,
					key: proposal,
					vote: this.vote.bind(this)
				});
			});

			return React.createElement(React.Fragment, null, title, proposals);
		} else {

			return React.createElement(React.Fragment, null, 'Loading...');
		}
	}

	vote() {
		this.setState({
			voted: true
		});
	}
}