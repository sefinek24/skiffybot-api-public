const { kaomoji } = require('./scripts/endpoints.js');
const { cat, dog, owo, uwu, love } = require('./scripts/arrays.js');

module.exports = (req, res) => {
	if (!kaomoji.includes(req.params.endpoint)) return res.status(400).send({ success: false, status: 400, message: 'Wrong endpoint.' });

	const result = () => {
		switch (req.params.endpoint) {
		case 'cat': return cat[Math.floor(Math.random() * cat.length)];
		case 'dog': return dog[Math.floor(Math.random() * dog.length)];
		case 'owo': return owo[Math.floor(Math.random() * owo.length)];
		case 'uwu': return uwu[Math.floor(Math.random() * uwu.length)];
		case 'love': return love[Math.floor(Math.random() * love.length)];
		default: return null;
		}
	};

	res.status(200).json({
		success: true,
		status: 200,
		category: 'kaomoji',
		endpoint: req.params.endpoint,
		message: result(),
	});
};