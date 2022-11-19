const img = 'https://noel.sefinek.net/images/bgs/main_1920x1080.jpg';

module.exports = {
	animal: ['cat', 'dog', 'fox', 'fish', 'alpaca', 'bird' ],
	string: ['8ball'],
	kaomoji: ['cat', 'dog', 'owo', 'uwu', 'love'],
	filter: {
		blur: {
			params: { image: 'url', strength: { type: 'number', min: 1, max: 256, default: 5 } },
			example: `https://api.sefinek.net/api/v1/filter/blur?image=${img}&strength=20`,
		},
		greyscale: {
			params: { image: 'url' },
			example: `https://api.sefinek.net/api/v1/filter/greyscale?image=${img}`,
		},
		contrast: {
			params: { image: 'url', strength: { type: 'number', min: -1, max: 1, default: 0.1 } },
			example: `https://api.sefinek.net/api/v1/filter/contrast?image=${img}&strength=0.2`,
		},
		invert: {
			params: { image: 'url' },
			example: `https://api.sefinek.net/api/v1/filter/invert?image=${img}`,
		},
		dither565: {
			params: { image: 'url' },
			example: `https://api.sefinek.net/api/v1/filter/dither565?image=${img}`,
		},
		normalize: {
			params: { image: 'url' },
			example: `https://api.sefinek.net/api/v1/filter/normalize?image=${img}`,
		},
	},
};