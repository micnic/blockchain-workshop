import React from 'react';

import Api from '../api';

export default class Proposal extends React.Component {

	render() {

		const voteButton = React.createElement('button', {
			disabled: this.props.voted,
			onClick: this.vote.bind(this)
		}, 'vote');

		return React.createElement('div', null, this.props.proposal, voteButton);
	}

	vote() {
		Api.vote(this.props.proposal).then(this.props.vote);
	}
}