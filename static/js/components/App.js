import React from 'react';

import Api from '../api';

export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			loaded: false,
			proposals: null
		};
	}

	componentDidMount() {
		Api.getContract().then(() => Api.getProposals()).then((proposals) => {
			this.setState({
				loaded: true,
				proposals
			});
		}).catch((error) => {
			console.log('Could not load abi');
		});
	}

	render() {

		if (this.state.loaded) {
			return React.createElement(React.Fragment, null, `Here are the proposals: ${JSON.stringify(this.state.proposals)}`);
		} else {

			return React.createElement(React.Fragment, null, 'Loading...');
		}
	}
}