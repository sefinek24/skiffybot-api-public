const Jimp = require('jimp');
const dir = type => (process.env.NODE_ENV === 'production' ? `/home/ubuntu/node/www/skiffybot-cdn/public/temp/images/filters/${type}/` : `D:\\Discord\\www\\cdn\\public\\temp\\images\\filters\\${type}\\`);
const fileName = () => `IMG_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1}.jpg`;

exports.blur = async (res, query) => {
	if (query.strength && isNaN(query.strength)) return { validationErr: true, status: 405, message: 'Strength is not a number.' };
	if (query.strength < 1) return { validationErr: true, status: 405, message: 'Strength value is too small. (< 1)' };
	if (query.strength > 256) return { validationErr: true, status: 405, message: 'Strength value is too high. (> 256)' };

	const img = await Jimp.read(query.image);
	const result = img.blur(query.strength ? parseInt(query.strength, 10) : 5).quality(80);

	const file = fileName();
	await result.writeAsync(`${dir('blur')}${file}`);
	return file;
};

exports.greyscale = async (res, query) => {
	const img = await Jimp.read(query);
	const result = img.greyscale().quality(96);

	const file = fileName();
	await result.writeAsync(`${dir('greyscale')}${file}`);
	return file;
};

exports.contrast = async (res, query) => {
	if (query.strength && isNaN(query.strength)) return { validationErr: true, status: 405, message: 'Strength is not a number.' };
	if (query.strength < -1) return { validationErr: true, status: 405, message: 'Strength value is too small. (< -1)' };
	if (query.strength > 1) return { validationErr: true, status: 405, message: 'Strength value is too high. (> 1)' };

	const img = await Jimp.read(query.image);
	const result = img.contrast(query.strength ? Number(query.strength) : 0.1).quality(91);

	const file = fileName();
	await result.writeAsync(`${dir('contrast')}${file}`);
	return file;
};

exports.invert = async (res, query) => {
	const img = await Jimp.read(query);
	const result = img.invert().quality(92);

	const file = fileName();
	await result.writeAsync(`${dir('invert')}${file}`);
	return file;
};

exports.dither565 = async (res, query) => {
	const img = await Jimp.read(query);
	const result = img.dither565().quality(90);

	const file = fileName();
	await result.writeAsync(`${dir('dither565')}${file}`);
	return file;
};

exports.normalize = async (res, query) => {
	const img = await Jimp.read(query);
	const result = img.normalize().quality(90);

	const file = fileName();
	await result.writeAsync(`${dir('normalize')}${file}`);
	return file;
};