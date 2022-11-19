const { version } = require('../package.json');

module.exports = (req, res) => res.status(200).json({ success: true, status: 200, version });