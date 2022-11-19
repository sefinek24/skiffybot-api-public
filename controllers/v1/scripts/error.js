module.exports = (res, err) => {
	res.status(500).send({ success: false, status: 500, message: 'Image render error.' });
	console.error(err);
};