const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res, next) => {
// 	res.send('Hello form server');
// });

const server = app.listen(4000, () => {
	console.log('listening on http://localhost:4000/');
});

const io = socket(server);

io.on('connection', socket => {
	socket.on('chat', data => {
		io.sockets.emit('chat', data);
	});

	socket.on('typing', user => {
		socket.broadcast.emit('typing', user);
	});
});
