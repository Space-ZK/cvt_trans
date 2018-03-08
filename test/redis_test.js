'use strict';

const redis = require('redis');
const redisConfig = {
	'host': '127.0.0.1',
	'port': 6379
};

const redisDBNum = '0';
let redisClient = redis.createClient(redisConfig);
redisClient.on('error', function (err) {
	console.log('create client error: ' + err);
});


redisClient.select(redisDBNum, function(err) {
	if(err) {
		console.log('select redis database error');
	} else {
		console.log('select database successfully');
	}
});
