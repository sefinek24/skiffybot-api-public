const { filter } = require('./scripts/endpoints.js');
const { blur, greyscale, contrast, invert, dither565, normalize } = require('./scripts/filtersWorker.js');

module.exports = async (req, res) => {
	if (!filter[req.params.endpoint]) return res.status(400).send({ success: false, status: 400, message: 'Bad Request. Wrong endpoint.' });
	if (!(/\.(?:jpe?|pn)g/gm).test(req.query.image)) return res.status(400).send({ success: false, status: 400, message: 'URL address does not lead to any photo.' });
	if ((/(grabify\.link|tinyurl\.com)/gm).test(req.query.image)) return res.status(403).send({ success: false, status: 403, message: 'The domain specified is not allowed in the \'image\' parameter.' });

	const operation = () => {
		switch (req.params.endpoint) {
		case 'blur': return blur(res, req.query);
		case 'greyscale': return greyscale(res, req.query.image);
		case 'contrast': return contrast(res, req.query);
		case 'invert': return invert(res, req.query.image);
		case 'dither565': return dither565(res, req.query.image);
		case 'normalize': return normalize(res, req.query.image);
		default: return null;
		}
	};

	try {
		const data = await operation();
		if (!data) return res.status(500).send({ success: false, status: 500, message: 'Fatal error.' });
		if (data.validationErr) return res.status(500).send({ success: false, status: data.status, message: data.message });

		res.status(200).json({
			success: true,
			status: 200,
			category: 'filter',
			endpoint: req.params.endpoint,
			message: `https://cdn.sefinek.net/temp/images/filters/${req.params.endpoint}/${data}`,
		});
	} catch (err) {
		res.status(403).send({ success: false, status: 403, message: 'Operation error. The link to the photo may be wrong.' });
	}
};