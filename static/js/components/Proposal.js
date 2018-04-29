import React from 'react';

import Api from '../api';

export default class Proposal extends React.Component {

	constructor() {

		super();

		this.state = {
			voteCount: 0
		};
	}

	componentDidMount() {

		Api.getProposalVoteCount(this.props.proposal).then((voteCount) => {

			this.setState({
				voteCount
			});
		});
	}

	render() {

		const voteButton = React.createElement('button', {
			disabled: this.props.disabled,
			onClick: this.vote.bind(this)
		}, 'vote');

		const voteCount = React.createElement('span', {}, `Votes: ${this.state.voteCount}`);
		
		const img = React.createElement("img", {"src": Api.imgURL(this.props.proposal)});

		return React.createElement('div', {
			className: 'proposal',
			style: {
				background: this.props.leader ? '#F0FFF0' : 'transparent'
			}
		}, img, this.props.proposal, voteCount, voteButton);
	}

	vote() {
		Api.vote(this.props.proposal).then(this.props.vote);
	}
}