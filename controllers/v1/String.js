const { magicBall } = require('./scripts/arrays.js');
const { string } = require('./scripts/endpoints.js');

module.exports = (req, res) => {
	if (!string.includes(req.params.endpoint)) return res.status(400).send({ success: false, status: 400, message: 'Wrong endpoint.' });

	const result = () => {
		switch (req.params.endpoint) {
		case '8ball': return magicBall[Math.floor(Math.random() * magicBall.length)];
		default: return null;
		}
	};

	res.status(200).json({
		success: true,
		status: 200,
		category: 'string',
		endpoint: req.params.endpoint,
		message: result(),
	});
};