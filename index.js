const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('static'));

app.get('/abi.json', (req, res) => {
	fs.readFile(path.resolve(__dirname, 'Voting.json'), (error, content) => {
		res.send(JSON.stringify(JSON.parse(content).abi));
	});
});

app.listen(8080);