const cluster = require('node:cluster');
const totalCPUs = require('node:os').cpus().length;
require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
	require('./server.js');
} else if (cluster.isMaster) {
	console.log(`Primary ${process.pid} is running`);

	for (let i = 0; i < totalCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', worker => {
		console.log(`Worker ${worker.process.pid} died`);
	});
} else {
	require('./server.js');

	console.log(`Worker ${process.pid} started`);
}