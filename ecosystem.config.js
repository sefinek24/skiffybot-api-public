module.exports = {
	apps: [{
		name            : 'skiffybot-api',
		script          : './index.js',

		log_date_format : 'HH:mm:ss, DD.MM.YYYY',
		error_file      : '/home/ubuntu/logs/www/api/error.log',
		out_file        : '/home/ubuntu/logs/www/api/out.log',

		max_restarts          : 8,
		restart_delay         : 6000,
		wait_ready            : true,

		instances             : 'max',
		exec_mode             : 'cluster',
	}],
};