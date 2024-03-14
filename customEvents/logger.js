const EventEmmiter = require('events');
const logEvent = require('../utililties/logEvents');

const logger = new EventEmmiter();


// declare a new event
logger.on('log', req => logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`));

module.exports = logger;