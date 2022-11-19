const express = require('express');
const { hidePoweredBy } = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const rateLimit = require('express-rate-limit');
const timeout = require('express-timeout-handler');
const cors = require('cors');
const { notFound, internalError, unavailable } = require('./middlewares/errors.js');

// Run express instance
const app = express();

// Use & enable
app.use(hidePoweredBy());
app.use(cors({ origin: 'http://127.0.0.1:3010', credentials: true }));
app.use(favicon('public/favicon.png'));
app.use(express.static('./public'));
app.use(morgan(`:method :url [:status] :response-time ms - ${process.pid} - :user-agent`));

// Set
app.set('view engine', 'ejs');

// Timeout handler
const Options = { timeout: 30000, onTimeout: unavailable, disable: ['write', 'setHeaders', 'send', 'json', 'end'] };
app.use(timeout.handler(Options));

const limiter = rateLimit({
	windowMs: 4 * 60 * 1000,
	max: 200,
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res) => res.status(429).send({ success: false, status: 429, message: 'Too Many Requests' }),
});
app.use('/', limiter, require('./routers/index.js'));

// Errors
app.use(notFound);
app.use(internalError);

// Run server
app.listen(process.env.PORT, () => {
	if (process.env.NODE_ENV === 'production') process.send('ready'); else console.log(`Website https://api.sefinek.net is running on http://127.0.0.1:${process.env.PORT}`);
});