const { readdirSync } = require('fs');
const { animal } = require('./scripts/endpoints.js');

module.exports = (req, res) => {
	if (!animal.includes(req.params.endpoint)) return res.status(400).send({ success: false, status: 400, message: 'Bad Request. Wrong endpoint.' });

	const files = readdirSync(
		process.env.NODE_ENV === 'production' ? `/home/ubuntu/node/www/skiffybot-cdn/public/images/animals/${req.params.endpoint}` : `D:\\Discord\\www\\cdn\\public\\images\\animals\\${req.params.endpoint}`,
	);
	const file = files[Math.floor(Math.random() * files.length)];

	res.status(200).json({
		success: true,
		status: 200,
		category: 'animals',
		endpoint: req.params.endpoint,
		message: `https://cdn.sefinek.net/images/animals/${req.params.endpoint}/${file}`,
	});
};