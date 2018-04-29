import React from 'react';

import Api from '../api';

import Proposal from './Proposal';

export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			loaded: false,
			voted: false,
			totalVoteCount: 0,
			leader: null,
			proposals: null
		};
	}

	componentDidMount() {

		Api.getContract().then((contract) => {

			return Promise.all([
				Promise.resolve(contract),
				Api.hasVoted(),
				Api.getLeader(),
				Api.getTotalVoteCount(),
				Api.getProposals()
			]);
		}).then(([contract, voted, leader, totalVoteCount, proposals]) => {

			if (!voted) {
				contract.Voted().watch((error, response) => {
					this.setState({
						voted: true
					});
				});
			}

			this.setState({
				loaded: true,
				leader,
				proposals,
				totalVoteCount,
				voted
			});
		}).catch((error) => {
			console.log('Could not load abi');
		});
	}

	render() {

		if (this.state.loaded) {

			const title = React.createElement('div', {}, `Here are our fruits, choose one: (Voters: ${this.state.totalVoteCount})`);

			const proposals = this.state.proposals.map((proposal) => {

				return React.createElement(Proposal, {
					proposal,
					disabled: this.state.voted,
					leader: (this.state.leader === proposal),
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