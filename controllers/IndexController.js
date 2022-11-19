const { version } = require('../package.json');

function pad(s) {
	return (s < 10 ? '0' : '') + s;
}
function format(number) {
	const hrs = Math.floor(number / (60 * 60));
	const min = Math.floor(number % (60 * 60) / 60);
	const sec = Math.floor(number % 60);

	return `${pad(hrs)}:${pad(min)}:${pad(sec)}`;
}

module.exports = (req, res) => res.render('index', { version, uptime: format(process.uptime()) });